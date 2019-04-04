process.env.JWT_SECRET = 'TEST_SECRET'

const passport = require('passport')

const {
    tokenize,
    requireLogin
} = require('../auth-controller')

describe('Auth Controller Tests', () => {
    describe('tokenize tests', () => {
        test('it should return token successfully', async () => {
            const userId = 1

            const token = tokenize(userId)

            expect(typeof token).toBe('string')
        })
    })

    describe('requireLogin tests', () => {
        test('it should move to next middleware successfully', () => {
            passport.authenticate = jest.fn((type, session, callback) => () => callback(null, {}, {}))

            const nextMock = jest.fn()

            requireLogin({}, {}, nextMock)

            expect(nextMock.mock.calls.length).toBe(1)
            expect(nextMock.mock.calls[0][0]).toBeUndefined()
        })

        test('it should move to next middleware with error', () => {
            passport.authenticate = jest.fn((type, session, callback) => () => callback(new Error()))

            const nextMock = jest.fn()

            requireLogin({}, {}, nextMock)

            expect(nextMock.mock.calls.length).toBe(1)
            expect(nextMock.mock.calls[0][0]).toEqual(new Error())
        })

        test('it should return login error', () => {
            const message = 'Incorrect username or password'

            passport.authenticate = jest.fn((type, session, callback) => () => callback(null, null, {
                message
            }))

            const jsonMock = jest.fn(() => {})
            const res = {
                json: jsonMock
            }

            requireLogin({}, res)

            expect(jsonMock.mock.calls.length).toBe(1)
            expect(jsonMock.mock.calls[0][0]).toEqual({
                message,
                status: 'fail'
            })
        })
    })
})
