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
    sendMail: jest.fn().mockResolvedValue(account)
}

describe('Auth Service Tests', () => {
    describe('sendEmail tests', () => {
        test('it should send email successfully', async () => {
            nodemailer.createTestAccount = jest.fn().mockResolvedValue(account)
            nodemailer.createTransport = jest.fn().mockReturnValue(createTransportMock)

            const response = await sendEmail(to, token)

            expect(response).toEqual(account)
        })

        test('it should throw error', async () => {
            nodemailer.createTestAccount = jest.fn().mockRejectedValue(new Error())

            await expect(sendEmail(to, token)).rejects.toThrow()
        })
    })
})
