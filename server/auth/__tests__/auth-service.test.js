const nodemailer = require('nodemailer')
const signale = require('signale')

// disable logging during testing
signale.disable()

const {
    sendEmail
} = require('../auth-service')

const to = 'test@gmail.com'
const token = 'TEST_TOKEN'
const account = {
    user: 'user@gmail.com',
    pass: 'pass'
}
const createTransportMock = {
    sendMail: async () => account
}

describe('Auth Service Tests', () => {
    describe('sendEmail tests', () => {
        test('it should send email successfully', async () => {
            nodemailer.createTestAccount = jest.fn(() => account)
            nodemailer.createTransport = jest.fn(() => createTransportMock)

            const response = await sendEmail(to, token)

            expect(response).toEqual(account)
        })

        test('it should throw error', async () => {
            nodemailer.createTestAccount = jest.fn(() => {
                throw new Error()
            })

            await expect(sendEmail(to, token)).rejects.toThrow()
        })
    })
})
