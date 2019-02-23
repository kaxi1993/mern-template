import React, { Component } from 'react'

import { TextField, Button } from '@material-ui/core'

import './Forgot.scss'

class Forgot extends Component {
    constructor (props) {
        super(props)

        this.state = {
            email: ''
        }
    }

    render () {
        const { email } = this.state

        return (
            <div className='mt-forgot mt-auth'>
                <div className='mt-auth__form-container'>
                    <h2 className='mt-auth__title'>Forgot</h2>
                    <p className='mt-forgot__description'>
                        To reset your password, please enter the email address and we will send you instructions.
                    </p>
                    <form className='mt-auth__form'>
                        <TextField
                            label='Email'
                            type='email'
                            name='email'
                            autoComplete='email'
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
                                Reset password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Forgot
