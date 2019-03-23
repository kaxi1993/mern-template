import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { TextField, Button } from '@material-ui/core'

import {
    SIGNUP_REQUEST
} from './constants'

import './Signup.scss'

class Signup extends Component {
    constructor (props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.redirectToLoginPage = this.redirectToLoginPage.bind(this)
    }

    componentDidUpdate (oldProps) {
        if (this.props._id !== oldProps._id) {
            this.redirectToLoginPage()
        }
    }

    redirectToLoginPage () {
        this.setState({
            name: '',
            email: '',
            password: ''
        })

        this.props.history.push('/login?message=Registration was successful! Please login!')
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

        const { name, email, password } = this.state

        this.props.dispatch({ type: SIGNUP_REQUEST, payload: { name, email, password } })
    }

    render () {
        const { name, email, password } = this.state
        const { error } = this.props

        return (
            <div className='mt-signup mt-auth'>
                <div className='mt-auth__form-container'>
                    {error && (
                        <div className='mt-info mt-info--error'>
                            {error.message}
                        </div>
                    )}
                    <h2 className='mt-auth__title'>Sign up</h2>
                    <form className='mt-auth__form' onSubmit={this.handleSubmit}>
                        <TextField
                            label='Name'
                            type='text'
                            name='name'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                            value={name}
                            error={error && error.field === 'name'}
                            onChange={this.handleChange}
                        />
                        <TextField
                            label='Email'
                            type='email'
                            name='email'
                            autoComplete='email'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                            value={email}
                            error={error && error.field === 'email'}
                            onChange={this.handleChange}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            name='password'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                            value={password}
                            error={error && error.field === 'password'}
                            onChange={this.handleChange}
                        />
                        <div className='mt-auth__actions'>
                            <p className='mt-signup__privacy'>
                                By clicking "Create new account" below, you agree to our&nbsp;
                                <Link to='/terms' className='mt-auth__action-link'>Terms of Service</Link>
                                &nbsp;and&nbsp;
                                <Link to='/privacy' className='mt-auth__action-link'>Privacy Policy</Link>
                            </p>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                size='large'
                                fullWidth={true}
                                style={{
                                    paddingTop: 12,
                                    paddingBottom: 12
                                }}
                            >
                                Create New Account
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { _id, isLoading, error } = state.signup

    return {
        _id,
        isLoading,
        error
    }
}

export default withRouter(connect(mapStateToProps, null)(Signup))
