import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Profile from './Profile'
import Settings from './Settings'

import './Dashboard.scss'

function Dashboard () {
    return (
        <div className='mt-dashboard'>
            <Switch>
                <Route exact path='/app' component={Home} />
                <Route path='/app/profile' component={Profile} />
                <Route path='/app/settings' component={Settings} />
                <Redirect from='/' to='/app' />
            </Switch>
        </div>
    )
}

export default Dashboard
