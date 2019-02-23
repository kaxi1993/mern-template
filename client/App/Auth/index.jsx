import React from 'react'
import { Route } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'
import Forgot from './Forgot'

import './Auth.scss'

function Auth () {
    return (
        <div className='mt-container'>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/forgot' component={Forgot} />
        </div>
    )
}

export default Auth
