import React from 'react'
import ReactDOM from 'react-dom'
import Imprint from './Imprint'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Imprint />, div)
  ReactDOM.unmountComponentAtNode(div)
})
