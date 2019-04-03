import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

import { API_ERROR } from '../../../Auth/constants'
import {
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILURE
} from './constants'

import Api from './api'

function* getTasks (action) {
    try {
        const response = yield call(Api.getTasks, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? GET_TASKS_SUCCESS : GET_TASKS_FAILURE

        yield put({
            type,
            payload
        })
    } catch (e) {
        yield put({ type: API_ERROR, payload: e })

        yield put({
            type: GET_TASKS_FAILURE,
            payload: e
        })
    }
}

function* whatchGetTasks () {
    yield takeLatest(GET_TASKS_REQUEST, getTasks)
}

export default whatchGetTasks
