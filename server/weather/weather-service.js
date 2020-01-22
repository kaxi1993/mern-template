// https://samples.openweathermap.org/q=London,uk&appid=8d11d40104dbafe4b4d644bca1e05a06

const request = require('request')
const signale = require('signale')

const getCityWeather = (city) => {
    const url = `${process.env.WEATHER_API_URL}/data/2.5/weather?q=${city}&&appid=${process.env.WEATHER_API_KEY}`

    return new Promise((resolve, reject) => {
        request(url, (err, request, body) => {

            if (!err) {
                signale.debug('getCityWeather data', body)

                return resolve(body)
            }

            signale.fatal('Error occured in getCityWeather', err)

            reject(err)
        })
    })
}

module.exports = {
    getCityWeather
}
