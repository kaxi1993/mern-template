import {
    FORGOT_REQUEST,
    FORGOT_SUCCESS,
    FORGOT_FAILURE
} from './constants'

const initialState = {
    message: '',
    isLoading: false,
    error: null
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case FORGOT_REQUEST:
            newState = {
                ...state,
                message: '',
                isLoading: true,
                error: null
            }
            break
        case FORGOT_SUCCESS:
            newState = {
                ...state,
                message: action.payload.message,
                isLoading: false,
                error: null
            }
            break
        case FORGOT_FAILURE:
            {
                const {
                    message,
                    field
                } = action.payload

                newState = {
                    ...state,
                    message: '',
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
