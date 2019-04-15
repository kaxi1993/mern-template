const bcrypt = require('bcrypt-nodejs')

const User = require('../user-model')

const candidatePasword = 'password'
const password = 'password'
const salt = 'testsalt'
const hash = 'testhash'

describe('User Model Tests', () => {
    describe('comparePassword Tests', () => {
        test('it should return isMatch successfully', () => {
            const user = new User()

            user.password = password

            const comparePasswordMock = jest.fn()

            bcrypt.compare = jest.fn((newPass, oldPass, callback) => callback(null, newPass === oldPass))

            user.comparePassword(candidatePasword, comparePasswordMock)

            expect(comparePasswordMock.mock.calls.length).toBe(1)
            expect(comparePasswordMock.mock.calls[0][0]).toBeNull()
            expect(comparePasswordMock.mock.calls[0][1]).toBeTruthy()
        })

        test('it should return error', () => {
            const user = new User()

            user.password = password

            const comparePasswordMock = jest.fn()

            bcrypt.compare = jest.fn((newPassword, oldPassword, callback) => callback(new Error()))

            user.comparePassword(candidatePasword, comparePasswordMock)

            expect(comparePasswordMock.mock.calls.length).toBe(1)
            expect(comparePasswordMock.mock.calls[0][0]).toBeInstanceOf(Error)
        })
    })

    describe('preSave Tests', () => {
        test('it should execute preSave hook successfully', () => {
            const user = new User()

            user.password = password

            const nextMock = jest.fn()

            bcrypt.genSalt = jest.fn((size, callback) => callback(null, salt))
            bcrypt.hashSync = jest.fn().mockReturnValue(hash)

            user.preSave(nextMock)

            expect(nextMock.mock.calls.length).toBe(1)
            expect(user.password).toBe(hash)
        })

        test('it should return error', () => {
            const user = new User()

            const nextMock = jest.fn()

            bcrypt.genSalt = jest.fn((size, callback) => callback(new Error()))

            user.preSave(nextMock)

            expect(nextMock.mock.calls.length).toBe(1)
            expect(nextMock.mock.calls[0][0]).toBeInstanceOf(Error)
        })
    })
})
