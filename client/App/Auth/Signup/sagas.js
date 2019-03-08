import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from './constants'

import Api from './api'

function* signup (action) {
    try {
        const response = yield call(Api.signup, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? SIGNUP_SUCCESS : SIGNUP_FAILURE

        yield put({
            type,
            payload
        })
    } catch (e) {
        yield put({
            type: SIGNUP_FAILURE,
            payload: e
        })
    }
}

function* whatchSignup () {
    yield takeLatest(SIGNUP_REQUEST, signup)
}

export default whatchSignup
