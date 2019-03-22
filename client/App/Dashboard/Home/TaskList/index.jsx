import React, { Component } from 'react'
import { connect } from 'react-redux'

import Task from '../Task'

import { GET_TASKS_REQUEST } from './constants'
import { ADD_TASK_FAILURE } from '../NewTask/constants'

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
        const { error } = this.props
        const tasks = this.props.tasks.map(task => (<Task key={task._id} task={task} />))

        return (
            <div className='mt-task-list'>
                {error && error.type !== ADD_TASK_FAILURE && (
                    <div className='mt-info mt-info--error'>
                        {error.message}
                    </div>
                )}
                {tasks}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { tasks, error } = state.home

    return {
        tasks,
        error
    }
}

export default connect(mapStateToProps)(TaskList)
