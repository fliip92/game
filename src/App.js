import './App.css'

import React, { Component } from 'react'

class App extends Component {
  render() {
    return <div className="game">
      {
        //this.renderPopup()
      }
      {/* <World key={this.props.world.key} cells={this.props.world.cells} cellSize={config.CELL_SIZE} /> */}
      <div className="statusbar">
        <div className="left">
          <div className="level">lvl </div>
          <div className="xp">
            <div
              className="bar"
              style={{ width: `${(20 % 1000) * 100 / 1000}%` }} // experience level
            ></div>
          </div>
        </div>
        <div className={`weapon -barweapon`}></div> {
          //player skin
        }
        <div className="right">
          <div className="hp">
            <div
              className="bar"
              style={{ width: `${100 > 0 ? 100 * 100 / 100 : 0}%` }} // player life
            >
            </div>
          </div>
          <div className="title">hp</div>
        </div>
      </div>

      <div className="extra-buttons">
        <label>
          <input
            type="checkbox"
            checked={false}
            onChange={() => { }}
          />
          toggle fog
      </label>
        <div className="rules">find golden axe and kill chaos knight</div>
      </div>
    </div>
  }
}

export default App
