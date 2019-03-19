import React, { Component } from 'react'
import { connect } from 'react-redux'

import Task from '../Task'

import { GET_TASKS_REQUEST } from './constants'

import './TaskList.scss'

class TaskList extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    componentDidMount () {
        this.props.dispatch({ type: GET_TASKS_REQUEST })
    }

    render () {
        const tasks = this.props.tasks.map(task => (<Task key={task._id} task={task} />))

        return (
            <div className='mt-task-list'>
                {tasks}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { tasks } = state.home

    return {
        tasks
    }
}

export default connect(mapStateToProps)(TaskList)
