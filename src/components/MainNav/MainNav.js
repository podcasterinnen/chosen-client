import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initialiseSession } from '../../containers/Session/SessionActions'

class MainNav extends Component {
  render() {
    const { sessionState } = this.props

    return(
      <nav>
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/podcasterinnen">Podcasterinnen</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/about">Über uns</Link></li>
          <li>
            <Link to="/session">
              { sessionState === 'UNKNOWN' &&
                <span>Login</span>
              }
              { sessionState === 'REGISTERED' &&
                <span>Register</span>
              }
            </Link>
          </li>
        </ol>
      </nav>
    )
  }
}

MainNav.propTypes = {
  sessionState: PropTypes.string,
}

MainNav.defaultProps = {
  sessionState: 'UNKNOWN',
}

const mapDispatchToProps = (dispatch) => ({
  handleInitSession: () => {
    dispatch(initialiseSession())
  },
})

const mapStateToProps = (state) => ({
  sessionState: state.sessionReducer.sessionState,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainNav)