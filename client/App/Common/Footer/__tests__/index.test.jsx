import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Footer from '../index'

configure({ adapter: new Adapter() })

it('renders correctly', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        )
        .toJSON()

    expect(tree).toMatchSnapshot()
})
