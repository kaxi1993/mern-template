import {
    call,
    put,
    takeLatest
} from 'redux-saga/effects'

import {
    LOG_IN
} from '../constants'
import {
    LOGIN_SUCCESS
} from '../Login/constants'
import {
    RESET_REQUEST,
    RESET_SUCCESS,
    RESET_FAILURE
} from './constants'

import Api from './api'

function* reset (action) {
    try {
        const response = yield call(Api.reset, action.payload)
        const payload = response ? response.data : {}

        const type = payload.status === 'ok' ? RESET_SUCCESS : RESET_FAILURE

        yield put({
            type,
            payload
        })

        if (type === RESET_SUCCESS) {
            yield put({
                type: LOGIN_SUCCESS,
                payload
            })

            yield put({
                type: LOG_IN
            })
        }
    } catch (e) {
        yield put({
            type: RESET_FAILURE,
            payload: e
        })
    }
}

function* whatchReset () {
    yield takeLatest(RESET_REQUEST, reset)
}

export default whatchReset
