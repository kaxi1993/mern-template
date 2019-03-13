import {
    CHECK_AUTH_STATUS_REQUEST,
    CHECK_AUTH_STATUS_SUCCESS,
    CHECK_AUTH_STATUS_FAILURE,
    LOG_IN,
    LOG_OUT
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
        default:
            newState = state
    }

    return newState
}
