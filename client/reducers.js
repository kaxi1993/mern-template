import {
    combineReducers
} from 'redux'

import loginReducers from './App/Auth/Login/reducers'
import signupReducers from './App/Auth/Signup/reducers'

export default combineReducers({
    login: loginReducers,
    signup: signupReducers
})
