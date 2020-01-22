import {
    SEARCH_WEATHER_REQUEST,
    SEARCH_WEATHER_SUCCESS,
    SEARCH_WEATHER_FAILURE
} from './constants'

const initialState = {
    searches: [],
    isLoading: false,
    error: null
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case SEARCH_WEATHER_REQUEST:
            newState = {
                ...state,
                isLoading: true,
                error: null
            }
            break
        case SEARCH_WEATHER_SUCCESS:
            {
                const weatherData = action.payload

                newState = {
                    ...state,
                    weatherData,
                    isLoading: false,
                    error: null
                }
            }
            break
        case SEARCH_WEATHER_FAILURE:
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
