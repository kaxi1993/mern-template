import axios from 'axios'

export default class AuthAPI {
    static checkStatus ({
        token
    }) {
        return axios.get('/api/status', {
            headers: {
                authorization: token
            }
        })
    }
}
