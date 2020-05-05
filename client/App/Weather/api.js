import axios from 'axios'

export default class WeatherAPI {
    static searchWeather ({ city, sessionId }) {
        return axios.post('/api/weather', {
            city,
            sessionId
        })
    }
}
