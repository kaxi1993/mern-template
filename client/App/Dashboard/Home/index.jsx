import React, { Component } from 'react'

class Home extends Component {
    constructor (props) {
        super(props)

        this.state = {
            name: 'App'
        }
    }

    render () {
        return (
            <div className='mt-profile'>
                {this.state.name}
            </div>
        )
    }
}

export default Home
