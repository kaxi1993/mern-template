import React from 'react'
import { Route } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'
import Forgot from './Forgot'
import Reset from './Reset'

import './Auth.scss'

function Auth () {
    return (
        <div className='mt-container'>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/forgot' component={Forgot} />
            <Route path='/reset' component={Reset} />
        </div>
    )
}

export default Auth
