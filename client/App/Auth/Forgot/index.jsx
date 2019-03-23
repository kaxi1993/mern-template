import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TextField, Button } from '@material-ui/core'

import { FORGOT_REQUEST } from './constants'

import './Forgot.scss'

class Forgot extends Component {
    constructor (props) {
        super(props)

        this.state = {
            email: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate (oldProps) {
        if (this.props.message !== oldProps.message) {
            this.setState({
                email: ''
            })
        }
    }

    handleChange (event) {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        if (this.props.isLoading) {
            return
        }

        const { email } = this.state

        this.props.dispatch({ type: FORGOT_REQUEST, payload: { email } })
    }

    render () {
        const { message, error } = this.props

        return (
            <div className='mt-forgot mt-auth'>
                <div className='mt-auth__form-container'>
                    {message && (
                        <div className='mt-info mt-info--success'>
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className='mt-info mt-info--error'>
                            {error.message}
                        </div>
                    )}
                    <h2 className='mt-auth__title'>Forgot</h2>
                    <p className=' mt-auth__description'>
                        To reset your password, please enter the email address and we will send you instructions.
                    </p>
                    <form className='mt-auth__form' onSubmit={this.handleSubmit}>
                        <TextField
                            label='Email'
                            type='email'
                            name='email'
                            autoComplete='email'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                            value={this.state.email}
                            error={error && error.field === 'email'}
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
                                Reset password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { message, isLoading, error } = state.forgot

    return {
        message,
        isLoading,
        error
    }
}

export default connect(mapStateToProps)(Forgot)
