const {
    Router
} = require('express')

const router = Router()

const {
    // getSearches,
    searchWeather
} = require('./weather-controller')

// router.get('/seatches', getSearches)
router.post('/weather', searchWeather)

module.exports = router
