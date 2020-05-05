import {
    call,
    put,
    delay,
    takeLatest
} from 'redux-saga/effects'

import {
    SEARCH_WEATHER_REQUEST,
    SEARCH_WEATHER_SUCCESS,
    SEARCH_WEATHER_FAILURE
} from './constants'

import Api from './api'

function* searchWeather (action) {
    try {
        const response = yield call(Api.searchWeather, action.payload)
        const payload = response ? response.data : {}

        yield put({
            type: SEARCH_WEATHER_SUCCESS,
            payload
        })
    } catch (e) {
        yield put({
            type: SEARCH_WEATHER_FAILURE,
            payload: e
        })
    }
}

function* whatchWeather () {
    yield takeLatest(SEARCH_WEATHER_REQUEST, searchWeather)
}

export default whatchWeather
