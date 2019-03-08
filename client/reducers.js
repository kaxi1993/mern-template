import {
    combineReducers
} from 'redux'

import signupReducers from './App/Auth/Signup/reducers'

export default combineReducers({
    signup: signupReducers
})
