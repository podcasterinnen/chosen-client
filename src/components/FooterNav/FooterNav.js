import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import './FooterNav.css'

class FooterNav extends Component {
  render() {
    return(
      <nav className="footernav">
        <ol className="footernav__list">
          <li className="footernav__list__element">
            <NavLink
              activeClassName="footernav__list__element__link--active"
              className="footernav__list__element__link"
              to="/privacy"
            >
              Datenschutz
            </NavLink>
          </li>
          <li className="footernav__list__element">
            <NavLink
              activeClassName="footernav__list__element__link--active"
              className="footernav__list__element__link"
              to="/imprint"
            >
              Kontakt & Impressum
            </NavLink>
          </li>
        </ol>
      </nav>
    )
  }
}

export default withRouter(connect()(FooterNav))