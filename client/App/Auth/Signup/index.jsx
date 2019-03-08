import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { TextField, Button, Checkbox } from '@material-ui/core'

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
            password: '',
            privacy: false
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate (oldProps) {
        if (this.props.isLoading !== oldProps.isLoading) {
        }
    }

    handleCheckboxChange () {
        this.setState(state => ({
            privacy: !state.privacy
        }))
    }

    handleInputChange (event) {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const { name, email, password } = this.state

        this.props.dispatch({ type: SIGNUP_REQUEST, payload: { name, email, password } })
    }

    render () {
        return (
            <div className='mt-signup mt-auth'>
                <div className='mt-auth__form-container'>
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
                            onChange={this.handleInputChange}
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
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            name='password'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                            onChange={this.handleInputChange}
                        />
                        <div className='mt-auth__actions'>
                            <p className='mt-signup__privacy'>
                                <Checkbox
                                    checked={this.state.privacy}
                                    onChange={this.handleCheckboxChange}
                                    value='privacy'
                                    color='primary'
                                    id='privacy'
                                    style={{
                                        padding: 0,
                                        paddingRight: 5
                                    }}
                                />
                                <label htmlFor='privacy'>
                                    I agree to the&nbsp;
                                    <Link to='terms' className='mt-auth__action-link' target='_blank'>Terms of Service</Link>
                                    &nbsp;and&nbsp;
                                    <Link to='privacy' className='mt-auth__action-link' target='_blank'>Privacy Policy</Link>
                                </label>
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
    const { isLoading, error } = state.signup

    return {
        isLoading,
        error
    }
}

export default connect(mapStateToProps, null)(Signup)
