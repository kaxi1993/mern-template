import axios from 'axios'

export default class NewTaskAPI {
    static addTask ({
        title
    }) {
        return axios.post('/api/tasks', {
            title
        }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    }
}
