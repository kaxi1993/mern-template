import {
    spawn
} from 'redux-saga/effects'

import authSagas from './App/Auth/sagas'
import loginSagas from './App/Auth/Login/sagas'
import signupSagas from './App/Auth/Signup/sagas'
import newTaskSagas from './App/Dashboard/Home/NewTask/sagas'
import getTasksSagas from './App/Dashboard/Home/TaskList/sagas'

function* sagas () {
    yield spawn(authSagas)
    yield spawn(loginSagas)
    yield spawn(signupSagas)
    yield spawn(newTaskSagas)
    yield spawn(getTasksSagas)
}

export default sagas
