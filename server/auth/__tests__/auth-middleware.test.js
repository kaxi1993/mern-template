process.env.JWT_SECRET = 'TEST_SECRET'

const {
    jwtStrategyCallback,
    localStrategyCallback
} = require('../auth-middleware')

const User = require('../../users/user-model')

const email = 'test@gmail.com'
const password = 'password'
const user = {
    _id: 1,
    email: 'test@gmail.com',
    name: 'Test User'
}

describe('Auth Middleware Tests', () => {
    describe('jwtStrategyCallback tests', () => {
        test('it should return user successfully', async () => {
            User.findById = jest.fn().mockResolvedValue(user)

            const exp = Date.now() + 60000
            const doneMock = jest.fn()

            await jwtStrategyCallback({ exp }, doneMock)

            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeNull()
            expect(doneMock.mock.calls[0][1]).toEqual(user)
        })

        test('it should return exception', async () => {
            User.findById = jest.fn().mockRejectedValue(new Error())

            const doneMock = jest.fn()

            await jwtStrategyCallback({}, doneMock)

            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeInstanceOf(Error)
            expect(doneMock.mock.calls[0][1]).toBeFalsy()
        })

        test('it should return null because of invalid user _id', async () => {
            User.findById = jest.fn().mockResolvedValue(null)

            const doneMock = jest.fn()

            await jwtStrategyCallback({}, doneMock)

            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeNull()
            expect(doneMock.mock.calls[0][1]).toBeFalsy()
        })

        test('it should return null because of expired token', async () => {
            User.findById = jest.fn().mockResolvedValue(user)

            const exp = Date.now() - 60000
            const doneMock = jest.fn()

            await jwtStrategyCallback({ exp }, doneMock)

            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeNull()
            expect(doneMock.mock.calls[0][1]).toBeFalsy()
        })
    })

    describe('localStrategyCallback tests', () => {
        test('it should return user successfully', async () => {
            const doneMock = jest.fn()
            const comparePasswordMock = jest.fn((pass, callback) => callback(null, true))

            User.findOne = jest.fn().mockResolvedValue({
                ...user,
                comparePassword: comparePasswordMock
            })

            await localStrategyCallback(email, password, doneMock)

            expect(comparePasswordMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeNull()
            expect(doneMock.mock.calls[0][1]).toHaveProperty('_id', 'email', 'name')
        })

        test('it should return exception', async () => {
            const doneMock = jest.fn()

            User.findOne = jest.fn().mockRejectedValue(new Error())

            await localStrategyCallback(email, password, doneMock)

            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeInstanceOf(Error)
            expect(doneMock.mock.calls[0][1]).toBeFalsy()
        })

        test('it should return null because of incorrect email or password', async () => {
            const doneMock = jest.fn()

            User.findOne = jest.fn().mockResolvedValue(null)

            await localStrategyCallback(email, password, doneMock)

            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeNull()
            expect(doneMock.mock.calls[0][1]).toBeFalsy()
        })

        test('it should return null because of comparePassword error', async () => {
            const doneMock = jest.fn()
            const comparePasswordMock = jest.fn((pass, callback) => callback(new Error(), false))

            User.findOne = jest.fn().mockResolvedValue({
                ...user,
                comparePassword: comparePasswordMock
            })

            await localStrategyCallback(email, password, doneMock)

            expect(comparePasswordMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeInstanceOf(Error)
            expect(doneMock.mock.calls[0][1]).toBeFalsy()
        })

        test('it should return null because of incorrect password', async () => {
            const doneMock = jest.fn()
            const comparePasswordMock = jest.fn((pass, callback) => callback(null, false))

            User.findOne = jest.fn().mockResolvedValue({
                ...user,
                comparePassword: comparePasswordMock
            })

            await localStrategyCallback(email, password, doneMock)

            expect(comparePasswordMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls.length).toBe(1)
            expect(doneMock.mock.calls[0][0]).toBeNull()
            expect(doneMock.mock.calls[0][1]).toBeFalsy()
        })
    })
})
