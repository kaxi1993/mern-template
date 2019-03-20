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

import {
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE
} from './Task/constants'

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
        case UPDATE_TASK_REQUEST:
            newState = {
                ...state,
                isLoading: true,
                error: null
            }
            break
        case UPDATE_TASK_SUCCESS:
            {
                const {
                    task
                } = action.payload

                const tasks = state.tasks.map((item) => {
                    if (item._id !== task._id) {
                        return item
                    }

                    return task
                })

                newState = {
                    ...state,
                    tasks,
                    isLoading: false,
                    error: null
                }
            }
            break
        case UPDATE_TASK_FAILURE:
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
        case DELETE_TASK_REQUEST:
            newState = {
                ...state,
                isLoading: true,
                error: null
            }
            break
        case DELETE_TASK_SUCCESS:
            {
                const {
                    _id
                } = action.payload

                const tasks = state.tasks.filter(item => item._id !== _id)

                newState = {
                    ...state,
                    tasks,
                    isLoading: false,
                    error: null
                }
            }
            break
        case DELETE_TASK_FAILURE:
            {
                const {
                    message
                } = action.payload

                newState = {
                    ...state,
                    isLoading: false,
                    error: {
                        message
                    }
                }
            }
            break
        default:
            newState = state
    }

    return newState
}
