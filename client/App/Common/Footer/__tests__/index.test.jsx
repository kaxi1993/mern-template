import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

import Footer from '../index'

describe('<Footer/> Snapshot Tests', () => {
    it('should render footer correctly', () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <Footer />
                </MemoryRouter>
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })
})
