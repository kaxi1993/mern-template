import axios from 'axios'

export default class LoginAPI {
    static login ({
        email,
        password
    }) {
        return axios.post('/api/login', {
            email,
            password
        })
    }
}
