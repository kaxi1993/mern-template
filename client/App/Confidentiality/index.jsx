import React from 'react'
import { Route } from 'react-router-dom'

import Terms from './Terms'
import Privacy from './Privacy'

import './Confidentiality.scss'

function Confidentiality () {
    return (
        <div className='mt-container'>
            <Route path='/terms' component={Terms} />
            <Route path='/privacy' component={Privacy} />
        </div>
    )
}

export default Confidentiality
