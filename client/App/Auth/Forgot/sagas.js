import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

import {
    FORGOT_REQUEST,
    FORGOT_SUCCESS,
    FORGOT_FAILURE
} from './constants'

import Api from './api'

function* forgot (action) {
    try {
        const response = yield call(Api.forgot, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? FORGOT_SUCCESS : FORGOT_FAILURE

        yield put({
            type,
            payload
        })
    } catch (e) {
        yield put({
            type: FORGOT_FAILURE,
            payload: e
        })
    }
}

function* whatchForgot () {
    yield takeLatest(FORGOT_REQUEST, forgot)
}

export default whatchForgot
