import {
    call,
    put,
    delay,
    takeLatest
} from 'redux-saga/effects'

import {
    CHECK_AUTH_STATUS_REQUEST,
    CHECK_AUTH_STATUS_SUCCESS,
    CHECK_AUTH_STATUS_FAILURE
} from './constants'

import Api from './api'

function* checkStatus (action) {
    try {
        yield delay(1000)

        const response = yield call(Api.checkStatus, action.payload)
        const payload = response ? response.data : {}

        yield put({
            type: CHECK_AUTH_STATUS_SUCCESS,
            payload
        })
    } catch (e) {
        yield put({
            type: CHECK_AUTH_STATUS_FAILURE,
            payload: e
        })
    }
}

function* whatchAuth () {
    yield takeLatest(CHECK_AUTH_STATUS_REQUEST, checkStatus)
}

export default whatchAuth
