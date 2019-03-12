import {
    spawn
} from 'redux-saga/effects'

import authSagas from './App/Auth/sagas'
import loginSagas from './App/Auth/Login/sagas'
import signupSagas from './App/Auth/Signup/sagas'

function* sagas () {
    yield spawn(authSagas)
    yield spawn(loginSagas)
    yield spawn(signupSagas)
}

export default sagas
