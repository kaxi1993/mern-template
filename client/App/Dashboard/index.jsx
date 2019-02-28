import React from 'react'
import { Route } from 'react-router-dom'

import './Dashboard.scss'

function Auth () {
    return (
        <div className='mt-dashboard'>
            <Route exact path='/' component={Dashboard}></Route>
        </div>
    )
}

export default Auth
