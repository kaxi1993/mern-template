import React from 'react'
import { Route } from 'react-router-dom'

import Login from './Login'

function Auth () {
    return (
        <div className='mt-container'>
            <Route path='/login' component={Login} />
        </div>
    )
}

export default Auth
