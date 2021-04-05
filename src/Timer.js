import React from 'react';

class Timer extends React.Component {

  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }
  render() {
    const { work } = this.props;
    const { rest } = this.props;
    return (
      <div id="timer" className={this.props.runningRest ? 'background-rest' : 'background-work'}>
        <div class="box">
          <div class="label">Set</div>
          <div id="set-count"><span id="set-nr">{this.props.sets}</span></div>
        </div>
        <div class="box">
          <div class="label">Work</div>
          <div id="time-left">{this.format(work)}</div>
        </div>
        <div class="box">
          <div class="label">Rest</div>
          <div id="rest-left">{this.format(rest)}</div>
        </div>
      </div >
    )
  }
}

export default Timer;

