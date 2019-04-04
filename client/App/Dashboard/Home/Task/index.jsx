import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TextField, Button } from '@material-ui/core'

import {
    UPDATE_TASK_REQUEST,
    DELETE_TASK_REQUEST,
    START_TASK_EDITING,
    CANCEL_TASK_EDITING
} from './constants'

import './Task.scss'

class Task extends Component {
    constructor (props) {
        super(props)

        this.state = {
            task: {}
        }

        this.updateTaskTitle = this.updateTaskTitle.bind(this)
        this.updateTaskStatus = this.updateTaskStatus.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.startEditing = this.startEditing.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    componentDidMount () {
        const task = { ...this.props.task }

        this.setState({
            task
        })
    }

    componentDidUpdate (oldProps) {
        const { task } = this.props

        if (task.status !== oldProps.task.status || task.title !== oldProps.task.title) {
            this.cancelEditing()
        }
    }

    updateTaskTitle (e) {
        e.preventDefault()

        const { task } = this.state

        if (task.title !== this.props.task.title) {
            this.props.dispatch({ type: UPDATE_TASK_REQUEST, payload: task })
        } else {
            this.cancelEditing()
        }
    }

    updateTaskStatus () {
        const { task } = this.state

        task.status = task.status === 'TODO' ? 'DONE' : 'TODO'

        this.props.dispatch({ type: UPDATE_TASK_REQUEST, payload: task })
    }

    deleteTask () {
        const { _id } = this.props.task

        this.props.dispatch({ type: DELETE_TASK_REQUEST, payload: { _id } })
    }

    startEditing () {
        const { _id } = this.props.task

        this.props.dispatch({ type: START_TASK_EDITING, payload: { _id } })
    }

    cancelEditing () {
        this.setState({
            task: { ...this.props.task }
        })

        this.props.dispatch({ type: CANCEL_TASK_EDITING })
    }

    handleTitleChange (e) {
        const { value } = e.target
        const { task } = this.state

        task.title = value

        this.setState({
            task
        })
    }

    render () {
        const { activeTask, error } = this.props
        const { task } = this.state
        const { _id, title, status } = task

        if (activeTask !== _id) {
            return (
                <div className='mt-task-container'>
                    <div className='mt-task'>
                        <span className='mt-task__status' onClick={this.updateTaskStatus}>
                            {
                                status === 'TODO' ? (
                                    <svg className='mt-task__status--todo' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' /></svg>
                                ) : (<svg className='mt-task__status--done' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M0 0h24v24H0z' fill='none' /><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' /></svg>)
                            }
                        </span>
                        <span className='mt-task__title' onClick={this.startEditing}>
                            {status === 'TODO' ? title : <strike>{title}</strike>}
                        </span>
                        <button className='mt-task__action-delete' onClick={this.deleteTask}>
                            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' /><path d='M0 0h24v24H0z' fill='none' /></svg>
                        </button>
                    </div>
                    <div className='mt-divider'></div>
                </div>
            )
        }

        return (
            <div className='mt-task__form-container'>
                <form className='mt-task__form' onSubmit={this.updateTaskTitle}>
                    <TextField
                        label='Task Title'
                        type='text'
                        margin='normal'
                        variant='outlined'
                        required={true}
                        fullWidth={true}
                        autoFocus={true}
                        value={this.state.task.title}
                        error={error && error.field === 'title'}
                        onChange={this.handleTitleChange}
                    />
                    <div className='mt-task__actions'>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='medium'
                            type='submit'
                            className='mt-task__action-submit'
                            style={{ marginRight: 10 }}
                        >
                            Save
                        </Button>
                        <Button
                            variant='contained'
                            color='default'
                            size='medium'
                            onClick={this.cancelEditing}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { activeTask, error } = state.home

    return {
        activeTask,
        error
    }
}

export default connect(mapStateToProps)(Task)
