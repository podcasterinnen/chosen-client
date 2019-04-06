import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import iconTwitter from '../../assets/icons/twitter.png'
import './FooterNav.css'

class FooterNav extends Component {
  render() {
    return(
      <nav className="footernav">
        <ol className="footernav__list">

          <li className="footernav__list__element">
            <a 
              href="https://twitter.com/podcasterinnen" 
              className="footernav__list__element__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Twitter-Icon" className="footernav__icon" src={iconTwitter}></img>Folge uns auf Twitter
            </a>
          </li>

          <li className="footernav__list__element footernav__list__element--right">

            <NavLink
              activeClassName="footernav__list__element__link--active"
              className="footernav__list__element__link"
              to="/privacy"
            >
              Datenschutz
            </NavLink>
          </li>
          <li className="footernav__list__element footernav__list__element--rightest">
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