import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import chosenApp from './reducer'
import 'normalize.css'
import './index.css'
import { initialiseSession } from './containers/Session/SessionActions'

import Root from './Root'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  chosenApp,
  composeEnhancers(
    applyMiddleware(thunk)
  ),
)
store.dispatch(initialiseSession())

ReactDOM.render(
  <Root store={store} />, 
  document.getElementById('root')
)

registerServiceWorker()
