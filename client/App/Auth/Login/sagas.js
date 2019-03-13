import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

import {
    LOG_IN
} from '../constants'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './constants'

import Api from './api'

function* login (action) {
    try {
        const response = yield call(Api.login, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? LOGIN_SUCCESS : LOGIN_FAILURE

        yield put({
            type,
            payload
        })

        if (type === LOGIN_SUCCESS) {
            yield put({
                type: LOG_IN
            })
        }
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e
        })
    }
}

function* whatchLogin () {
    yield takeLatest(LOGIN_REQUEST, login)
}

export default whatchLogin
