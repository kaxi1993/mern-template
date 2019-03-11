import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './constants'

const initialState = {
    isLoading: false,
    error: null
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case LOGIN_REQUEST:
            newState = {
                ...state,
                isLoading: true,
                error: null
            }
            break
        case LOGIN_SUCCESS:
            newState = {
                ...state,
                token: action.payload.token,
                isLoading: false,
                error: null
            }
            break
        case LOGIN_FAILURE:
            {
                const {
                    message,
                    field
                } = action.payload

                newState = {
                    ...state,
                    isLoading: false,
                    error: {
                        message,
                        field
                    }
                }
            }
            break
        default:
            newState = state
    }

    return newState
}