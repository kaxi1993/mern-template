import React from 'react'

import NewTask from './NewTask'
import TaskList from './TaskList'

import './Home.scss'

function Home () {
    return (
        <div className='mt-home'>
            <NewTask />
            <TaskList />
        </div>
    )
}

export default Home
