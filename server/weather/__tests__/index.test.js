const request = require('supertest')
const signale = require('signale')

// disable logging during testing
signale.disable()

const app = require('../../app')

const Weather = require('../weather-model')
const WeatherService = require('../weather-service')

const sessionId = 'saughjfkbnaskjml'
const city = 'tbilisi'

describe('Weather API Tests', () => {
    describe('POST /api/weather tests', () => {
        test('it should return weather successfully', async () => {
            Weather.prototype.save = jest.fn().mockResolvedValue({})
            WeatherService.getCityWeather = jest.fn().mockReturnValue({})

            const response = await request(app).post('/api/weather').set('Accept', 'application/json').send({
                sessionId,
                city
            })

            expect(response.statusCode).toBe(200)
        })

        test('it should return error', async () => {
            WeatherService.getCityWeather = jest.fn(() => new Error())

            const response = await request(app).post('/api/weather').set('Accept', 'application/json').send({
                sessionId,
                city
            })

            expect(response.statusCode).toBe(500)
        })

        test('it should return field required error', async () => {
            const response = await request(app).post('/api/weather').set('Accept', 'application/json').send({
                city
            })

            console.log(response)

            expect(response.statusCode).toBe(400)
        })
    })
})
