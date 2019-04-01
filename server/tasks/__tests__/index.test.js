const request = require('supertest')
const signale = require('signale')

// disable logging during testing
signale.disable()

const app = require('../../app')

const Task = require('../task-model')

jest.mock('../../auth/auth-controller', () => ({
    ...(jest.requireActual('../../auth/auth-controller')),
    requireAuth: (req, res, next) => {
        req.user = {
            _id: 1,
            name: 'test',
            email: 'test@gmail.com'
        }

        next()
    }
}))

const title = 'test task'
const status = 'TODO'
const taskId = '1'

const task = {
    _id: 1,
    title,
    user: 1
}


describe('Tasks API Tests', () => {
    describe('GET /api/tasks tests', () => {
        test('it should return tasks successfully', async () => {
            Task.find = jest.fn().mockReturnValue({
                sort: jest.fn().mockResolvedValue([])
            })

            const response = await request(app).get('/api/tasks')

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('ok')
        })

        test('it should return error', async () => {
            Task.find = jest.fn(() => new Error())

            const response = await request(app).get('/api/tasks')

            expect(response.statusCode).toBe(500)
        })
    })

    describe('POST /api/tasks tests', () => {
        test('it should create task successfully', async () => {
            Task.prototype.save = jest.fn().mockResolvedValue(task)

            const response = await request(app).post('/api/tasks').set('Accept', 'application/json').send({
                title
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('ok')
            expect(response.body.task).toEqual(task)
        })

        test('it should return error', async () => {
            Task.prototype.save = jest.fn().mockRejectedValue(new Error())

            const response = await request(app).post('/api/tasks').set('Accept', 'application/json').send({
                title
            })

            expect(response.statusCode).toBe(500)
        })

        test('it should return title required error', async () => {
            const response = await request(app).post('/api/tasks')

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('title')
        })
    })

    describe('PUT /api/tasks/:id tests', () => {
        test('it should update task successfully', async () => {
            Task.findOne = jest.fn().mockResolvedValue(new Task())
            Task.prototype.save = jest.fn().mockResolvedValue(task)

            const response = await request(app).put(`/api/tasks/${taskId}`).set('Accept', 'application/json').send({
                title,
                status
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('ok')
            expect(response.body.task).toEqual(task)
        })

        test('it should return error', async () => {
            Task.findOne = jest.fn().mockRejectedValue(new Error())

            const response = await request(app).put(`/api/tasks/${taskId}`).set('Accept', 'application/json').send({
                title,
                status
            })

            expect(response.statusCode).toBe(500)
        })

        test('it should return title required error', async () => {
            const response = await request(app).put(`/api/tasks/${taskId}`).set('Accept', 'application/json').send({
                status
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('title')
        })

        test('it should return status required error', async () => {
            const response = await request(app).put(`/api/tasks/${taskId}`).set('Accept', 'application/json').send({
                title
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('status')
        })

        test('it should return status invalid error', async () => {
            const response = await request(app).put(`/api/tasks/${taskId}`).set('Accept', 'application/json').send({
                title,
                status: 'TEST_STATUS'
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
            expect(response.body.field).toBe('status')
        })

        test('it should return permission denied to update task error', async () => {
            Task.findOne = jest.fn().mockResolvedValue(null)

            const response = await request(app).put(`/api/tasks/${taskId}`).set('Accept', 'application/json').send({
                title,
                status
            })

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
        })
    })

    describe('DELETE /api/tasks/:id tests', () => {
        test('it should delete task successfully', async () => {
            Task.remove = jest.fn().mockResolvedValue({
                n: 1
            })

            const response = await request(app).delete(`/api/tasks/${taskId}`)

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('ok')
            expect(response.body._id).toBe(taskId)
        })

        test('it should return error', async () => {
            Task.remove = jest.fn().mockRejectedValue(new Error())

            const response = await request(app).delete(`/api/tasks/${taskId}`)

            expect(response.statusCode).toBe(500)
        })

        test('it should return you are not allowed to delete task error', async () => {
            Task.remove = jest.fn().mockResolvedValue({
                n: 0
            })

            const response = await request(app).delete(`/api/tasks/${taskId}`)

            expect(response.statusCode).toBe(200)
            expect(response.body.status).toBe('fail')
        })
    })
})
