const request = require('supertest')
const signale = require('signale')

// disable logging during testing
signale.disable()

const app = require('../../app')

const User = require('../user-model')

const name = 'test'
const email = 'test@gmail.com'
const password = 'password'

describe('Users API Tests', () => {
    describe('POST /api/users tests', () => {
        test('it should create user successfully', async () => {
            const _id = 1

            User.findOne = jest.fn().mockResolvedValue(null)

            User.prototype.save = jest.fn().mockResolvedValue({
                _id
            })

            const response = await request(app).post('/api/users').set('Accept', 'application/json').send({
                name,
                email,
                password
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('ok')
            expect(response.body._id).toBe(_id)
        })

        test('it should return error', async () => {
            User.findOne = jest.fn().mockRejectedValue(new Error())

            const response = await request(app).post('/api/users').set('Accept', 'application/json').send({
                name,
                email,
                password
            })

            expect(response.statusCode).toBe(500)
        })

        test('it should return name required error', async () => {
            const response = await request(app).post('/api/users').set('Accept', 'application/json').send({
                email,
                password
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('name')
        })

        test('it should return email required error', async () => {
            const response = await request(app).post('/api/users').set('Accept', 'application/json').send({
                name,
                password
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('email')
        })

        test('it should return password required error', async () => {
            const response = await request(app).post('/api/users').set('Accept', 'application/json').send({
                name,
                email
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('password')
        })

        test('it should return user with this email already exists error', async () => {
            const user = {
                _id: 1,
                name,
                email
            }

            User.findOne = jest.fn().mockResolvedValue(user)

            const response = await request(app).post('/api/users').set('Accept', 'application/json').send({
                name,
                email,
                password
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('email')
        })
    })
})
