import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Avatar, Button } from '@material-ui/core'

import Menu from './Menu'

import TOGGLE_PROFILE_MENU from '../constants'

import './Profile.scss'

class Profile extends Component {
    constructor (props) {
        super(props)

        this.state = {
            user: {}
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount () {
        this.setUser()
    }

    setUser () {
        let user

        try {
            user = JSON.parse(localStorage.getItem('user'))
        } catch (e) {
            user = {}
        }

        this.setState({
            user
        })
    }

    handleClick () {
        this.props.dispatch({ type: TOGGLE_PROFILE_MENU })
    }

    render () {
        const { menuOpen } = this.props
        const { user } = this.state

        const {
            avatarUrl,
            name
        } = user

        return (
            <div className='mt-header__profile'>
                <Button
                    onClick={this.handleClick}
                    className='mt-header__profile-action'
                    style={{
                        borderRadius: 0
                    }}
                >
                    <Avatar alt={name} src={avatarUrl || '/avatar.png'} className='mt-header__avatar' style={{
                        width: 30,
                        height: 30
                    }} />
                    {menuOpen ? (
                        <span className='mt-header__arrow-up'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M7 14l5-5 5 5z' /><path d='M0 0h24v24H0z' fill='none' /></svg>
                        </span>
                    ) : (<span className='mt-header__arrow-down'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z' /><path d='M0 0h24v24H0z' fill='none' /></svg>
                    </span>)}
                </Button>

                <Menu />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { menuOpen } = state.navbar

    return {
        menuOpen
    }
}

export default connect(mapStateToProps)(Profile)
