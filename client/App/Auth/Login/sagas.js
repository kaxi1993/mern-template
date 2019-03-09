import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

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
