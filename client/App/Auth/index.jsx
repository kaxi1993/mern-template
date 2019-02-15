import React from 'react'
import { Route } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'

import './Auth.scss'

function Auth () {
    return (
        <div className='mt-auth mt-container'>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
        </div>
    )
}

export default Auth
