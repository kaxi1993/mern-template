import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'

import './Profile.scss'

const avatarStyle = {
    width: 30,
    height: 30
}

class Profile extends Component {
    constructor (props) {
        super(props)

        this.state = {
            user: {
                fullName: 'Lasha Kakhidze',
                avatarUrl: '/avatar.png'
            },
            anchorEl: null
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClick (event) {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleClose () {
        this.setState({ anchorEl: null })
    }

    render () {
        const {
            user,
            anchorEl
        } = this.state

        const {
            avatarUrl,
            fullName
        } = user

        const open = Boolean(anchorEl)

        return (
            <div className='mt-header__profile-container'>
                <div className='mt-header__profile'>
                    <Button
                        aria-owns={open ? 'profile-menu' : undefined}
                        aria-haspopup='true'
                        onClick={this.handleClick}
                        className='mt-header__profile-action'
                    >
                        <Avatar alt={fullName} src={avatarUrl} className='mt-header__avatar' style={avatarStyle} />
                        {this.state.open ? (
                            <span className='mt-header__arrow-up'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M7 14l5-5 5 5z' /><path d='M0 0h24v24H0z' fill='none' /></svg>
                            </span>
                        ) : (
                            <span className='mt-header__arrow-down'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z' /><path d='M0 0h24v24H0z' fill='none' /></svg>
                            </span>
                        )}
                    </Button>
                    <Grow
                        style={{ transformOrigin: 'center bottom' }}
                    >
                        <Menu
                            id='profile-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                            className='mt-header__profile-menu'
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <span>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M0 0h24v24H0z' fill='none' /><path d='M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' /></svg>
                                </span>
                                <span>
                                    Log out
                                </span>
                            </MenuItem>
                        </Menu>
                    </Grow>
                </div>
            </div>
        )
    }
}

export default Profile
