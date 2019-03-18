import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE
} from './NewTask/constants'

const initialState = {
    tasks: [],
    isLoading: false,
    error: null
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case ADD_TASK_REQUEST:
            newState = {
                ...state,
                isLoading: true,
                error: null
            }
            break
        case ADD_TASK_SUCCESS:
            {
                const {
                    task
                } = action.payload

                newState = {
                    ...state,
                    tasks: [task, ...state.tasks],
                    isLoading: false,
                    error: null
                }
            }
            break
        case ADD_TASK_FAILURE:
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
