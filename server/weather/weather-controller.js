const signale = require('signale')

const Weather = require('./weather-model')
const {
    getCityWeather
} = require('./weather-service')


// const getSearches = async (req, res) => {
//     const {
//         sessionId
//     } = req.params

//     if (!sessionId) {
//         return []
//     }

//     try {
//         const searches = await Weather.find({
//             sessionId
//         })

//         return searches
//     } catch (e) {
//         signale.fatal('Error occured in getSearches', e)

//         res.status(500).send('Something bad happened!')
//     }
// }

const searchWeather = async (req, res) => {
    const {
        city,
        sessionId
    } = req.body

    if (!city || !sessionId) {
        return res.status(400).send('Fill all required field!')
    }

    try {
        const newSearch = {
            city,
            sessionId
        }

        const [data] = await Promise.all([
            getCityWeather(city),
            new Weather(newSearch).save()
        ])

        res.json(data)
    } catch (e) {
        signale.fatal('Error occured in searchWeather', e)

        res.status(500).send('Something bad happened!')
    }
}

module.exports = {
    // getSearches,
    searchWeather
}
