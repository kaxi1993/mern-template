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
                _id: action.payload._id,
                isLoading: false,
                error: null
            }
            break
        case SIGNUP_FAILURE:
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
