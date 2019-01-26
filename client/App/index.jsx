import React, { Component } from 'react'

import Navbar from './Common/Navbar'

import './normalize.scss'
import './common.scss'

class App extends Component {
    render () {
        return (
            <div className='App'>
                <Navbar />
            </div>
        )
    }
}

export default App
