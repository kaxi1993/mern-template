import axios from 'axios'

export default class TaskAPI {
    static updateTask ({
        _id,
        status,
        title
    }) {
        return axios.put(`/api/tasks/${_id}`, {
            status,
            title
        }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    }

    static deleteTask ({
        _id
    }) {
        return axios.delete(`/api/tasks/${_id}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    }
}
