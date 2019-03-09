import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { TextField, Button } from '@material-ui/core'

import {
    LOGIN_REQUEST
} from './constants'

import './Login.scss'

class Login extends Component {
    constructor (props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate (oldProps) {
        const { token } = this.props

        if (token !== oldProps.token) {
            localStorage.setItem('token', token)
        }
    }

    handleChange (event) {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        if (this.props.isLoading) {
            return
        }

        const { email, password } = this.state

        this.props.dispatch({ type: LOGIN_REQUEST, payload: { email, password } })
    }


    render () {
        const { error } = this.props

        return (
            <div className='mt-login mt-auth'>
                <div className='mt-auth__form-container'>
                    {error && (
                        <div className='mt-auth__error'>
                            {error.message}
                        </div>
                    )}
                    <h2 className='mt-auth__title'>Log in</h2>
                    <form className='mt-auth__form' onSubmit={this.handleSubmit}>
                        <TextField
                            label='Email'
                            type='email'
                            name='email'
                            autoComplete='email'
                            margin='normal'
                            variant='outlined'
                            // required={true}
                            fullWidth={true}
                            error={error && error.field === 'email'}
                            onChange={this.handleChange}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            name='password'
                            margin='normal'
                            variant='outlined'
                            // required={true}
                            fullWidth={true}
                            error={error && error.field === 'password'}
                            onChange={this.handleChange}
                        />
                        <div className='mt-auth__actions'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='large'
                                fullWidth={true}
                                style={{
                                    paddingTop: 12,
                                    paddingBottom: 12
                                }}
                            >
                                Log in
                            </Button>
                            <p className='mt-login__forgot'>
                                <Link to='forgot' className='mt-auth__action-link'>Forgot your password?</Link>
                            </p>
                            <p className='mt-login__signup'>
                                Don't have an account?&nbsp;
                                <Link to='signup' className='mt-auth__action-link'>Sign up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { token, isLoading, error } = state.login

    return {
        token,
        isLoading,
        error
    }
}

export default withRouter(connect(mapStateToProps, null)(Login))
