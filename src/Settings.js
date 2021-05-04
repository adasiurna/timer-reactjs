import React, { Component } from 'react';
import { format } from "./format"

class Settings extends Component {

  render() {
    return (
      <div id="settings">
        <div className="set box">
          <div id="set-label" className="label">Sets</div>
          <div className="box-flex">
            <div id="set-decrement" onClick={this.props.ONdecSets} className="calc-sign">[-]</div>
            <div id="set-length" className="length">{this.props.sets}</div>
            <div id="set-increment" onClick={this.props.ONincSets} className="calc-sign">[+]</div>
          </div>
        </div>
        <div className="session box">
          <div id="session-label" className="label">Work</div>
          <div className="box-flex">
            <div id="session-decrement" onClick={this.props.ONdecWork} className="calc-sign">[-]</div>
            <div id="session-length" className="length">{format(this.props.work)}</div>
            <div id="session-increment" onClick={this.props.ONincWork} className="calc-sign">[+]</div>
          </div>
        </div>
        <div className="break box">
          <div id="break-label" className="label">Rest</div>
          <div className="box-flex">
            <div id="break-decrement" onClick={this.props.ONdecRest} className="calc-sign">[-]</div>
            <div id="break-length" className="length">{format(this.props.rest)}</div>
            <div id="break-increment" onClick={this.props.ONincRest} className="calc-sign">[+]</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings