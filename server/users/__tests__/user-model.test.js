const bcrypt = require('bcrypt-nodejs')

const User = require('../user-model')

const candidatePasword = 'password'
const password = 'password'

describe('User Model Tests', () => {
    describe('comparePassword Tests', () => {
        test('it should return isMatch successfully', () => {
            const user = new User()

            user.password = password

            const comparePasswordMock = jest.fn()

            bcrypt.compare = jest.fn((newPassword, oldPassword, callback) => callback(null, newPassword === oldPassword))

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
})
