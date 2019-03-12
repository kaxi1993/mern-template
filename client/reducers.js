import {
    combineReducers
} from 'redux'

import authReducers from './App/Auth/reducers'
import loginReducers from './App/Auth/Login/reducers'
import signupReducers from './App/Auth/Signup/reducers'

export default combineReducers({
    auth: authReducers,
    login: loginReducers,
    signup: signupReducers
})
