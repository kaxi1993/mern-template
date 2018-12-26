import React, { Component } from 'react'

class App extends Component {
    constructor (props) {
        super(props)

        this.state = {
            name: 'React Web App'
        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.name}</h1>
            </div>
        )
    }
}

export default App
