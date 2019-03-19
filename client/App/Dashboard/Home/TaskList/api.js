import axios from 'axios'

export default class TaskListAPI {
    static getTasks () {
        return axios.get('/api/tasks', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    }
}
