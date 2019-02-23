import React, { Component } from 'react'

import { TextField, Button } from '@material-ui/core'

import './Reset.scss'

class Reset extends Component {
    constructor (props) {
        super(props)

        this.state = {
            newPassword: '',
            confirmPassword: ''
        }
    }

    render () {
        const { newPassword, confirmPassword } = this.state

        return (
            <div className='mt-reset mt-auth'>
                <div className='mt-auth__form-container'>
                    <h2 className='mt-auth__title'>Reset</h2>
                    <p className='mt-auth__description'>
                        Please fill the fields below to change your password.
                    </p>
                    <form className='mt-auth__form'>
                        <TextField
                            label='New Password'
                            placeholder='Enter a new password'
                            type='password'
                            margin='normal'
                            variant='outlined'
                            fullWidth={true}
                        />
                        <TextField
                            label='Confirm Password'
                            placeholder='Confirm your new password'
                            type='password'
                            margin='normal'
                            variant='outlined'
                            fullWidth={true}
                        />
                        <div className='mt-auth__actions'>
                            <Button
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

export default Reset
