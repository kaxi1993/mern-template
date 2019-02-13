import React, { Component } from 'react'

import { TextField, Button } from '@material-ui/core'

import './Login.scss'

class Login extends Component {
    constructor (props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    render () {
        const { email, password } = this.state

        return (
            <div className='mt-login'>
                <div className='mt-login__form-containerr'>
                    <h2 className='mt-auth__title'>Log in</h2>
                    <form className='mt-login__form'>
                        <TextField
                            label='Email'
                            type='email'
                            name='email'
                            autoComplete='email'
                            margin='normal'
                            variant='outlined'
                            fullWidth={true}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            margin='normal'
                            variant='outlined'
                            fullWidth={true}
                        />
                        <div className='mt-auth__actions'>
                            <Button
                                variant='contained'
                                color='primary'
                                size='large'
                                fullWidth={true}
                                style={{
                                    paddingTop: '16px',
                                    paddingBottom: '16px'
                                }}
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
