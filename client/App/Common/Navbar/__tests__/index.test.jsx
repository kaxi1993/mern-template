import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

import store from '../../../../store'
import Navbar from '../index'

describe('<Navbar/> Snapshot Tests', () => {
    it('should render navbar correctly', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <MemoryRouter>
                        <Navbar />
                    </MemoryRouter>
                </Provider>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })
})
