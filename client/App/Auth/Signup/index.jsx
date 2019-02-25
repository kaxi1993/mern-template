import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { TextField, Button, Checkbox } from '@material-ui/core'

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

        this.handlePrivacyChange = this.handlePrivacyChange.bind(this)
    }

    handlePrivacyChange () {
        this.setState(state => ({
            privacy: !state.privacy
        }))
    }

    render () {
        const { name, email, password } = this.state

        return (
            <div className='mt-signup mt-auth'>
                <div className='mt-auth__form-container'>
                    <h2 className='mt-auth__title'>Sign up</h2>
                    <form className='mt-auth__form'>
                        <TextField
                            label='Name'
                            type='text'
                            name='name'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
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
                        />
                        <TextField
                            label='Password'
                            type='password'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                        />
                        <div className='mt-auth__actions'>
                            <p className='mt-signup__privacy'>
                                <Checkbox
                                    checked={this.state.privacy}
                                    onChange={this.handlePrivacyChange}
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

export default Signup
