import React from 'react'
import ReactDOM from 'react-dom'
import Podcasterinnen from './Podcasterinnen'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Podcasterinnen />, div)
  ReactDOM.unmountComponentAtNode(div)
})
