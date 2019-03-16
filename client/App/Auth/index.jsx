import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'
import Forgot from './Forgot'
import Reset from './Reset'

import './Auth.scss'

function Auth ({ isAuthenticated }) {
    return (
        <div className='mt-container'>
            <Route path='/(login|signup|forgot|reset)' render={() => (
                isAuthenticated && <Redirect to='/app' />
            )} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/forgot' component={Forgot} />
            <Route path='/reset' component={Reset} />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth

    return {
        isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(Auth))
