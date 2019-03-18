import React, { Component } from 'react'

import NewTask from './NewTask'

import './Home.scss'

class Home extends Component {
    constructor (props) {
        super(props)

        this.state = {
            name: 'App'
        }
    }

    render () {
        const { name } = this.state

        return (
            <div className='mt-home'>
                <NewTask />
            </div>
        )
    }
}

export default Home
