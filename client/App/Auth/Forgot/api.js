import axios from 'axios'

export default class ForgotAPI {
    static forgot ({
        email
    }) {
        return axios.post('/api/forgot', {
            email
        })
    }
}
