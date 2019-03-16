import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Profile from './Profile'
import Settings from './Settings'

import './Dashboard.scss'

function Dashboard ({ isAuthenticated }) {
    return (
        <div className='mt-dashboard'>
            <Route path='/app' render={() => (
                !isAuthenticated && <Redirect to='/login' />
            )} />
            <Route exact path='/app' component={Home} />
            <Route path='/app/profile' component={Profile} />
            <Route path='/app/settings' component={Settings} />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth

    return {
        isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))
