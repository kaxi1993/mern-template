import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

import { API_ERROR } from '../../../Auth/constants'
import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE
} from './constants'

import Api from './api'

function* addTask (action) {
    try {
        const response = yield call(Api.addTask, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? ADD_TASK_SUCCESS : ADD_TASK_FAILURE

        yield put({
            type,
            payload
        })
    } catch (e) {
        yield put({ type: API_ERROR, payload: e })

        yield put({
            type: ADD_TASK_FAILURE,
            payload: e
        })
    }
}

function* whatchAddTask () {
    yield takeLatest(ADD_TASK_REQUEST, addTask)
}

export default whatchAddTask
