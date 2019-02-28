import React, { Component } from 'react'

import Navbar from './Common/Navbar'
import Footer from './Common/Footer'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Confidentiality from './Confidentiality'

import './normalize.scss'
import './common.scss'

class App extends Component {
    render () {
        return (
            <div className='App'>
                <Navbar />
                <Auth />
                <Confidentiality />
                <Footer />
            </div>
        )
    }
}

export default App
