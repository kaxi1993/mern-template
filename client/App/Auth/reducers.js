import {
    CHECK_AUTH_STATUS_REQUEST,
    CHECK_AUTH_STATUS_SUCCESS,
    CHECK_AUTH_STATUS_FAILURE
} from './constants'

const initialState = {
    isLoading: false,
    error: null
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
        default:
            newState = state
    }

    return newState
}
