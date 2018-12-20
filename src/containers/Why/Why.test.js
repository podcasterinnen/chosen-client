import React from 'react'
import ReactDOM from 'react-dom'
import Why from './Why'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Why />, div)
  ReactDOM.unmountComponentAtNode(div)
})
