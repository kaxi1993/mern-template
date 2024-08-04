const request = require('supertest')
const jwt = require('jwt-simple')
const signale = require('signale')

// disable logging during testing
signale.disable()

const app = require('../../app')

jest.mock('../auth-controller', () => ({
    ...(jest.requireActual('../auth-controller')),
    requireAuth: (req, res, next) => {
        req.isAuthenticated = () => true

        next()
    },
    requireLogin: (req, res, next) => {
        next()
    }
}))

const User = require('../../users/user-model')

const email = 'test@gmail.com'
const password = 'password'

const user = {
    _id: 1,
    email,
    name: 'test'
}

describe('Auth API Tests', () => {
    describe('GET /api/status tests', () => {
        test('it should return true', async () => {
            const response = await request(app).get('/api/status')

            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({
                isAuthenticated: true
            })
        })
    })

    describe('POST /api/login tests', () => {
        test('it should login successfully', async () => {
            User.findOne = jest.fn().mockResolvedValue(user)

            const response = await request(app).post('/api/login').set('Accept', 'application/json').send({
                email,
                password
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('ok')
        })

        test('it should return internal server error', async () => {
            User.findOne = jest.fn().mockRejectedValue(new Error())

            const response = await request(app).post('/api/login').set('Accept', 'application/json').send({
                email,
                password
            })

            expect(response.statusCode).toBe(500)
        })

        test('it should return email required error', async () => {
            User.findOne = jest.fn().mockResolvedValue(user)

            const response = await request(app).post('/api/login').set('Accept', 'application/json').send({
                password
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('email')
        })

        test('it should return password required error', async () => {
            User.findOne = jest.fn().mockResolvedValue(user)

            const response = await request(app).post('/api/login').set('Accept', 'application/json').send({
                email
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('password')
        })
    })
})
