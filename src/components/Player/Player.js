import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { PodloveWebPlayer } from '@podlove/player-react'
import { requestPlay } from '@podlove/player-actions/play'

import './Player.css'
import PLAYER_CONFIG from '../../config/playerConfig'

const Player = ({ id }) => {

  return (
    <div className="player-container">
      <PodloveWebPlayer
        episode={`https://backend.podlovers.org/wp-json/podlove-web-player/shortcode/publisher/${id}`}
        config={PLAYER_CONFIG}
        onLoaded={store => store.dispatch(requestPlay())}
      >
        { 
          `<root
            style="
              padding: 0 16px 16px 16px;
              max-width: 100vw;
              min-width: 100vw;
            "
          >
            <div style="flex: 1">
              <progress-bar></progress-bar>
            </div>
            <div style="display: flex; flex-direction: row">
              <div
                style="
                  width: 33%;
                  display: flex;
                  flex-direction: row;
                "
              >
                <poster
                  style="
                    width: 60px;
                    height: 60px;
                    border-radius: 3px;
                    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
                    margin-right: 8px;
                    overflow: hidden;
                  "
                ></poster>
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                  "
                >
                  <episode-title
                    style="
                      font-size: 16px;
                      text-transform: uppercase;
                    "
                  ></episode-title>
                  <current-chapter
                    style="
                      font-size: 14px;
                    "
                  ></current-chapter>
                </div>
              </div>
              <div
                style="
                  width: 33%;
                  flex-direction: row;
                  justify-content: center;
                  display: flex;
                "
              >
                <div style="margin: 0 4px; display: flex; ">
                  <chapter-previous></chapter-previous>
                </div>
                <div style="margin: 0 4px; display: flex; ">
                  <step-backward></step-backward>
                </div>
                <div style="margin: 0 4px; display: flex; ">
                  <play-button></play-button>
                </div>
                <div style="margin: 0 4px; display: flex; ">
                  <step-forward></step-forward>
                </div>
                <div style="margin: 0 4px; display: flex; ">
                  <chapter-next></chapter-next>
                </div>
              </div>
              <div
                style="
                  width: 33%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  flex-direction: row;
                  font-size: 14px;
                "
              >
                <timer-duration></timer-duration>
              </div>
            </div>
          </root>`
        } 
      </PodloveWebPlayer>
    </div>
  )
}

Player.propTypes = {
  id: PropTypes.string.isRequired,
}

export default withRouter(Player)