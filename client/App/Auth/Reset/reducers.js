import {
    RESET_REQUEST,
    RESET_SUCCESS,
    RESET_FAILURE
} from './constants'

const initialState = {
    isLoading: false,
    error: null
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case RESET_REQUEST:
            newState = {
                ...state,
                message: '',
                isLoading: true,
                error: null
            }
            break
        case RESET_SUCCESS:
            newState = {
                ...state,
                isLoading: false,
                error: null
            }
            break
        case RESET_FAILURE:
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
