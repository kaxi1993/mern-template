import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { TextField, Button } from '@material-ui/core'

import './Reset.scss'
import { RESET_REQUEST } from './constants';

class Reset extends Component {
    constructor (props) {
        super(props)

        this.state = {
            password: '',
            rePassword: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

        const { password, rePassword } = this.state

        const params = new URLSearchParams(this.props.location.search)
        const token = params.get('token') || ''

        this.props.dispatch({ type: RESET_REQUEST, payload: { password, rePassword, token } })
    }

    render () {
        const { error } = this.props
        const { password, rePassword } = this.state

        return (
            <div className='mt-reset mt-auth'>
                <div className='mt-auth__form-container'>
                    {error && (
                        <div className='mt-info mt-info--error'>
                            {error.message}
                        </div>
                    )}
                    <h2 className='mt-auth__title'>Reset</h2>
                    <p className='mt-auth__description'>
                        Please fill the fields below to change your password.
                    </p>
                    <form className='mt-auth__form' onSubmit={this.handleSubmit}>
                        <TextField
                            label='New Password'
                            type='password'
                            placeholder='Enter a new password'
                            name='password'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                            value={password}
                            error={error && error.field === 'password'}
                            onChange={this.handleChange}
                        />
                        <TextField
                            label='Confirm Password'
                            type='password'
                            name='rePassword'
                            placeholder='Confirm your new password'
                            margin='normal'
                            variant='outlined'
                            fullWidth={true}
                            required={true}
                            value={rePassword}
                            error={error && error.field === 'rePassword'}
                            onChange={this.handleChange}
                        />
                        <div className='mt-auth__actions'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                size='large'
                                fullWidth={true}
                            >
                                Change password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { error, isLoading } = state.reset

    return {
        error,
        isLoading
    }
}

export default withRouter(connect(mapStateToProps)(Reset))
