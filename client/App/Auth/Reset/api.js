import axios from 'axios'

export default class ResetAPI {
    static reset ({
        password,
        rePassword,
        token
    }) {
        return axios.post('/api/reset', {
            password,
            rePassword,
            token
        })
    }
}
