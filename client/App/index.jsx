import React, { Component } from 'react'

import Navbar from './Common/Navbar'
import Auth from './Auth'

import './normalize.scss'
import './common.scss'

class App extends Component {
    render () {
        return (
            <div className='App'>
                <Navbar />
                <Auth />
            </div>
        )
    }
}

export default App
