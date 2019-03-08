import axios from 'axios'

export default class SignupAPI {
    static signup ({
        name,
        email,
        password
    }) {
        return axios.post('/api/users', {
            name,
            email,
            password
        })
    }
}
