import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { TextField, Button } from '@material-ui/core'

import {
    SEARCH_WEATHER_REQUEST
} from './constants'

import './Weather.scss'

class Weather extends Component {
    constructor (props) {
        super(props)

        this.state = {
            city: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount () {
        this.generateSessionId()
    }

    generateSessionId () {
        let sessionId = localStorage.getItem('sessionId')

        if (!sessionId) {
            sessionId = Math.random().toString(36).substring(7)

            localStorage.setItem('sessionId', sessionId)
        }

        this.setState({
            sessionId
        })
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

        this.setState({
            city: ''
        })

        const { city, sessionId } = this.state

        this.props.dispatch({ type: SEARCH_WEATHER_REQUEST, payload: { city, sessionId } })
    }


    render () {
        const { city } = this.state
        const { error, weatherData } = this.props

        return (
            <div className='mt-login mt-auth'>
                <div className='mt-auth__form-container'>
                    {/* {search && (
                        <div className='mt-info mt-info--success'>
                            {search}
                        </div>
                    )}
                    {error && !search && (
                        <div className='mt-info mt-info--error'>
                            {error.message}
                        </div>
                    )} */}
                    <form className='mt-auth__form' onSubmit={this.handleSubmit}>
                        <TextField
                            label='City'
                            type='text'
                            name='city'
                            autoComplete='city'
                            margin='normal'
                            variant='outlined'
                            required={true}
                            fullWidth={true}
                            value={city}
                            error={error && error.field === 'city'}
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
                                Search
                            </Button>
                        </div>
                        <div className='mt-auth__result'>
                            {weatherData}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        searches,
        isLoading,
        weatherData
    } = state.weather

    return {
        searches,
        isLoading,
        weatherData
    }
}

export default withRouter(connect(mapStateToProps)(Weather))
