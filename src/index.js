import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css'

import About from './containers/About/About'
import App from './containers/App/App'
import Contact from './containers/Contact/Contact'
import Faq from './containers/Faq/Faq'
import Imprint from './containers/Imprint/Imprint'
import Podcasterinnen from './containers/Podcasterinnen/Podcasterinnen'
import Privacy from './containers/Privacy/Privacy'
import Session from './containers/Session/Session'

import FooterNav from './components/FooterNav/FooterNav'
import MainNav from './components/MainNav/MainNav'

import chosenApp from './reducer'

const store = createStore(
  chosenApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <MainNav></MainNav>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/faq" component={Faq} />
        <Route path="/imprint" component={Imprint} />
        <Route path="/podcasterinnen" component={Podcasterinnen} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/session" component={Session} />
        <FooterNav></FooterNav>
      </div>
    </Router>
  </Provider>, 
  document.getElementById('root'),
)

registerServiceWorker()
