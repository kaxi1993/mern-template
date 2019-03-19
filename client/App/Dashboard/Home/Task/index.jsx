import React, { Component } from 'react'

import './Task.scss'

class Task extends Component {
    constructor (props) {
        super(props)

        this.state = {}
    }

    render () {
        const { title, status } = this.props.task

        return (
            <div className='mt-task-container'>
                <div className='mt-task'>
                    <span className='mt-task__status'>
                        {
                            status === 'TODO' ? (
                                <svg className='mt-task__status--todo' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' /></svg>
                            ) : (<svg className='mt-task__status--done' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M0 0h24v24H0z' fill='none' /><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' /></svg>)
                        }

                    </span>
                    <p className='mt-task__title'>
                        {title}
                    </p>
                </div>
                <div className='mt-divider'></div>
            </div>
        )
    }
}

export default Task
