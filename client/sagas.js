import signupSagas from './App/Auth/Signup/sagas'

function* sagas () {
    yield* [
        signupSagas()
    ]
}

export default sagas
