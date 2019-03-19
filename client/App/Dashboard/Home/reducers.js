import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE
} from './NewTask/constants'

import {
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILURE
} from './TaskList/constants'

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
        case GET_TASKS_REQUEST:
            newState = {
                ...state,
                isLoading: true,
                error: null
            }
            break
        case GET_TASKS_SUCCESS:
            {
                const {
                    tasks
                } = action.payload

                newState = {
                    ...state,
                    tasks,
                    isLoading: false,
                    error: null
                }
            }
            break
        case GET_TASKS_FAILURE:
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
