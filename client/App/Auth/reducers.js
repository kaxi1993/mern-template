import {
    CHECK_AUTH_STATUS_REQUEST,
    CHECK_AUTH_STATUS_SUCCESS,
    CHECK_AUTH_STATUS_FAILURE,
    LOG_IN,
    LOG_OUT,
    API_ERROR
} from './constants'

const initialState = {
    isAuthenticated: null
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case CHECK_AUTH_STATUS_REQUEST:
            newState = {
                ...state,
                isAuthenticated: null
            }
            break
        case CHECK_AUTH_STATUS_SUCCESS:
            newState = {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
            break
        case CHECK_AUTH_STATUS_FAILURE:
            newState = {
                ...state,
                isAuthenticated: false
            }
            break
        case LOG_IN:
            newState = {
                ...state,
                isAuthenticated: true
            }
            break
        case LOG_OUT:
            newState = {
                ...state,
                isAuthenticated: false
            }
            break
        case API_ERROR:
            if (action.payload.response.status === 401) {
                newState = {
                    ...state,
                    isAuthenticated: false
                }
            } else {
                newState = state
            }
            break
        default:
            newState = state
    }

    return newState
}
