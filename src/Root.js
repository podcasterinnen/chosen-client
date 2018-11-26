import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { initialiseSession } from './containers/Session/SessionActions'
import PodcasterinnenRouter from './components/PodcasterinnenRouter/PodcasterinnenRouter';

const Root = ({ store }) => {
  store.dispatch(initialiseSession())
  return(
    <Provider store={store}>
      <PodcasterinnenRouter></PodcasterinnenRouter>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root