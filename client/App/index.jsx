import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Redirect } from 'react-router-dom'

import Navbar from './Common/Navbar'
import Footer from './Common/Footer'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Confidentiality from './Confidentiality'

import { CHECK_AUTH_STATUS_REQUEST } from './Auth/constants'

import './normalize.scss'
import './common.scss'
import './loader.scss'

class App extends Component {
    constructor (props) {
        super(props)

        this.state = {
            isLoading: true
        }
    }

    componentDidMount () {
        const token = localStorage.getItem('token')

        if (token) {
            this.props.dispatch({ type: CHECK_AUTH_STATUS_REQUEST, payload: { token } })
        } else {
            // add custom delay to wait for font download
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        }
    }

    componentDidUpdate (oldProps) {
        const { isAuthenticated } = this.props

        if (this.props.location.pathname !== oldProps.location.pathname) {
            window.scrollTo(0, 0)
        }

        if (isAuthenticated !== null && isAuthenticated !== oldProps.isAuthenticated) {
            if (!isAuthenticated) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }

            this.setState({
                isLoading: false
            })
        }
    }

    render () {
        const { isLoading } = this.state
        const { isAuthenticated } = this.props

        if (isLoading) {
            return (
                <div className='mt-loader'></div>
            )
        }

        return (
            <div className='App'>
                <Navbar />
                <div className='mt-content'>
                    <Route exact path='/' render={() => (
                        !isAuthenticated ? <Redirect to='/login' /> : <Redirect to='/app' />
                    )} />
                    <Auth />
                    <Dashboard />
                    <Confidentiality />
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth

    return {
        isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps, null)(App))
