import TOGGLE_PROFILE_MENU from './constants'

const initialState = {
    menuOpen: false
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case TOGGLE_PROFILE_MENU:
            newState = {
                ...state,
                menuOpen: !state.menuOpen
            }
            break
        default:
            newState = state
    }

    return newState
}
