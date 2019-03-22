import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TextField, Button } from '@material-ui/core'

import { ADD_TASK_REQUEST, ADD_TASK_FAILURE } from './constants'

import './NewTask.scss'

class NewTask extends Component {
    constructor (props) {
        super(props)

        this.state = {
            title: '',
            isEditing: false
        }

        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.clearTitle = this.clearTitle.bind(this)
        this.toggleEditing = this.toggleEditing.bind(this)
    }

    componentDidUpdate (oldProps) {
        if (this.props.tasks.length > oldProps.tasks.length) {
            this.clearTitle()
        }
    }

    addTask (e) {
        e.preventDefault()

        const { title } = this.state

        this.props.dispatch({ type: ADD_TASK_REQUEST, payload: { title } })
    }

    handleChange (e) {
        const { value } = e.target

        this.setState({
            title: value
        })
    }

    clearTitle () {
        this.setState({
            title: ''
        })
    }

    toggleEditing () {
        this.setState(state => ({
            isEditing: !state.isEditing
        }))
    }

    render () {
        const { error } = this.props
        const { isEditing } = this.state

        if (!isEditing) {
            return (
                <div className='mt-new-task__add' onClick={this.toggleEditing}>
                    <svg className='mt-new-task__add-icon' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' /></svg>
                    <span>Add Task</span>
                </div>
            )
        }

        return (
            <div className='mt-new-task__form-container'>
                {error && error.type === ADD_TASK_FAILURE && (
                    <div className='mt-info mt-info--error'>
                        {error.message}
                    </div>
                )}
                <form className='mt-new-task__form' onSubmit={this.addTask}>
                    <TextField
                        label='Task Title'
                        type='text'
                        margin='normal'
                        variant='outlined'
                        required={true}
                        fullWidth={true}
                        autoFocus={true}
                        value={this.state.title}
                        error={error && error.field === 'title'}
                        onChange={this.handleChange}
                    />
                    <div className='mt-new-task__actions'>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='medium'
                            type='submit'
                            className='mt-new-task__action-submit'
                            style={{ marginRight: 10 }}
                        >
                            Add Task
                        </Button>
                        <Button
                            variant='contained'
                            color='default'
                            size='medium'
                            onClick={this.toggleEditing}
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
    const { tasks, error } = state.home

    return {
        tasks,
        error
    }
}

export default connect(mapStateToProps)(NewTask)
