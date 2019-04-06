import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { LOG_OUT } from '../../../Auth/constants'
import TOGGLE_PROFILE_MENU from '../constants'

import './Menu.scss'

class Menu extends Component {
    constructor (props) {
        super(props)

        this.closeMenu = this.closeMenu.bind(this)
    }

    logOut (e) {
        e.preventDefault()

        localStorage.removeItem('token')
        localStorage.removeItem('user')

        this.props.history.push('/login')

        this.props.dispatch({ type: LOG_OUT })

        this.closeMenu()
    }

    closeMenu () {
        this.props.dispatch({ type: TOGGLE_PROFILE_MENU })
    }

    render () {
        const { menuOpen } = this.props

        return (
            <div className='mt-menu__container'>
                <div className='mt-menu__background' onClick={this.closeMenu} style={{ display: menuOpen ? 'block' : 'none' }}></div>
                <div className='mt-menu' style={{ display: menuOpen ? 'block' : 'none' }}>
                    <ul className='mt-menu__items'>
                        <li className='mt-menu__item'>
                            <Link to='/app' className='mt-menu__item-link' onClick={this.closeMenu}>
                                <span className='mt-menu__item-icon'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z'/><path d='M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z'/></svg>
                                </span>
                                Home
                            </Link>
                        </li>
                        <li className='mt-menu__item'>
                            <Link to='/app/profile' className='mt-menu__item-link' onClick={this.closeMenu}>
                                <span className='mt-menu__item-icon'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M19 5v14H5V5h14m0-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 10H6v-1.53c0-2.5 3.97-3.58 6-3.58s6 1.08 6 3.58V18zm-9.69-2h7.38c-.69-.56-2.38-1.12-3.69-1.12s-3.01.56-3.69 1.12z' /></svg>
                                </span>
                                Profile
                            </Link>
                        </li>
                        <li className='mt-menu__item'>
                            <Link to='/app/settings' className='mt-menu__item-link' onClick={this.closeMenu}>
                                <span className='mt-menu__item-icon'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' /></svg>
                                </span>
                                Settings
                            </Link>
                        </li>
                        <div className='mt-divider'></div>
                        <li className='mt-menu__item'>
                            <a href='#' className='mt-menu__item-link' onClick={e => this.logOut(e)}>
                                <span className='mt-menu__item-icon'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' /></svg>
                                </span>
                                Log out
                            </a>
                        </li>
                    </ul>
                </div >
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

export default withRouter(connect(mapStateToProps)(Menu))
