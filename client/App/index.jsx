import React, { Component } from 'react'

import Navbar from './Common/Navbar'

import './normalize.scss'
import './common.scss'

class App extends Component {
    constructor (props) {
        super(props)

        this.state = {
            name: 'React Web App'
        }
    }

    render () {
        return (
            <div className="App">
                <Navbar />
            </div>
        )
    }
}

export default App
