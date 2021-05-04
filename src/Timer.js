import React from 'react';
import { format } from "./format"

class Timer extends React.Component {

  render() {
    const { work } = this.props;
    const { rest } = this.props;
    return (
      <div id="timer" className={this.props.runningRest ? 'background-rest' : 'background-work'}>
        <div className="box">
          <div className="label">Set</div>
          <div id="set-count"><span id="set-nr">{this.props.sets}</span></div>
        </div>
        <div className="box">
          <div className="label">Work</div>
          <div id="time-left">{format(work)}</div>
        </div>
        <div className="box">
          <div className="label">Rest</div>
          <div id="rest-left">{format(rest)}</div>
        </div>
      </div >
    )
  }
}

export default Timer;

