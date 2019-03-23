import {
    spawn
} from 'redux-saga/effects'

import authSaga from './App/Auth/sagas'
import loginSaga from './App/Auth/Login/sagas'
import signupSaga from './App/Auth/Signup/sagas'
import forgotSaga from './App/Auth/Forgot/sagas'
import resetSaga from './App/Auth/Reset/sagas'
import getTasksSaga from './App/Dashboard/Home/TaskList/sagas'
import addTaskSaga from './App/Dashboard/Home/NewTask/sagas'
import { updateTaskSaga, deleteTaskSaga } from './App/Dashboard/Home/Task/sagas'

function* sagas () {
    yield spawn(authSaga)
    yield spawn(loginSaga)
    yield spawn(signupSaga)
    yield spawn(forgotSaga)
    yield spawn(resetSaga)
    yield spawn(getTasksSaga)
    yield spawn(addTaskSaga)
    yield spawn(updateTaskSaga)
    yield spawn(deleteTaskSaga)
}

export default sagas
