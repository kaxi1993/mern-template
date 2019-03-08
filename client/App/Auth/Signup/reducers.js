import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from './constants'

const initialState = {
    isLoading: false,
    error: null
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case SIGNUP_REQUEST:
            newState = {
                ...state,
                isLoading: true,
                error: null
            }
            break
        case SIGNUP_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                error: null
            }
            break
        case SIGNUP_FAILURE:
            newState = {
                ...state,
                isLoading: false,
                error: true
            }
            break
        default:
            newState = state
    }

    return newState
}
