const nodemailer = require('nodemailer')
const signale = require('signale')

const sendEmail = async (to, token) => {
    try {
        const {
            HOST,
            EMAIL
        } = process.env

        const account = await nodemailer.createTestAccount()

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })

        const url = `${HOST}/reset?token=${token}`

        const mailOptions = {
            from: `"Mern Template" <${EMAIL}>`,
            to,
            subject: 'Reset your password',
            text: `To reset your password, click the link below:\n${url}`,
            html: `<p>To reset your password, click the link below:</p><p>${url}</p>`
        }

        const info = await transporter.sendMail(mailOptions)

        return info
    } catch (e) {
        signale.fatal('Error occured in sendEmail service', e)

        throw e
    }
}

module.exports = {
    sendEmail
}
