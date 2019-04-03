import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

import { API_ERROR } from '../../../Auth/constants'
import {
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE
} from './constants'

import Api from './api'

function* updateTask (action) {
    try {
        const response = yield call(Api.updateTask, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? UPDATE_TASK_SUCCESS : UPDATE_TASK_FAILURE

        yield put({
            type,
            payload
        })
    } catch (e) {
        yield put({ type: API_ERROR, payload: e })

        yield put({
            type: UPDATE_TASK_FAILURE,
            payload: e
        })
    }
}

function* deleteTask (action) {
    try {
        const response = yield call(Api.deleteTask, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? DELETE_TASK_SUCCESS : DELETE_TASK_FAILURE

        yield put({
            type,
            payload
        })
    } catch (e) {
        yield put({ type: API_ERROR, payload: e })

        yield put({
            type: DELETE_TASK_FAILURE,
            payload: e
        })
    }
}

export function* updateTaskSaga () {
    yield takeLatest(UPDATE_TASK_REQUEST, updateTask)
}

export function* deleteTaskSaga () {
    yield takeLatest(DELETE_TASK_REQUEST, deleteTask)
}
