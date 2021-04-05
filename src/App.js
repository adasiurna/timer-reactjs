import React from 'react';
import Timer from './Timer'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: 10,
      work: 15,
      rest: 5,
      countSets: 10,
      countWork: 15,
      countRest: 5,
      runningWork: false,
      runningRest: false,
      pause: false
    }
    this.incSets = this.incSets.bind(this);
    this.decSets = this.decSets.bind(this);
    this.incWork = this.incWork.bind(this);
    this.decWork = this.decWork.bind(this);
    this.incRest = this.incRest.bind(this);
    this.decRest = this.decRest.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleWorkCountdown = this.handleWorkCountdown.bind(this);
    this.handleRestCountdown = this.handleRestCountdown.bind(this);
    this.handleWorkStop = this.handleWorkStop.bind(this);
    this.handleRestStop = this.handleRestStop.bind(this);
    this.playLongBeep = this.playLongBeep.bind(this);
    this.playShortBeep = this.playShortBeep.bind(this);
  }
  //const longBeep = new Audio("https://raw.githubusercontent.com/adasiurna/sounds/master/beep-01a.mp3");
  incSets() {
    if (this.state.sets < 99) {
      this.setState({ sets: this.state.sets + 1 })
    }
  }
  decSets() {
    if (this.state.sets > 1) {
      this.setState({ sets: this.state.sets - 1 })
    }
  }
  //incWork = () => this.setState({work: this.state.work + 1});
  incWork() {
    if (this.state.work < 3599) {
      this.setState({ work: this.state.work + 1 })
    }
  }
  decWork() {
    if (this.state.work > 5) {
      this.setState({ work: this.state.work - 1 })
    }
  }
  //incRest = () => this.setState({rest: this.state.rest + 1});
  incRest() {
    if (this.state.rest < 3599) {
      this.setState({ rest: this.state.rest + 1 })
    }
  }
  decRest() {
    if (this.state.rest > 0) {
      this.setState({ rest: this.state.rest - 1 })
    }
  }

  handleReset() {
    this.setState({ sets: 10, work: 15, rest: 5, countSets: 10, countWork: 15, countRest: 5, runningWork: false, runningRest: false, pause: false });
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  handleStartStop() {
    if (!this.state.runningWork && !this.state.runningRest && !this.state.pause) {
      this.setState({ countSets: this.state.sets, countWork: this.state.work, countRest: this.state.rest, runningWork: true });
      //this.playLongBeep();
    }
    else if ((this.state.runningWork || this.state.runningRest) && this.timer && !this.state.pause) {
      this.setState({ pause: true })
      clearInterval(this.timer);
    }
    else if (this.state.runningWork && this.timer && this.state.pause) {
      this.setState({ pause: false })
      //paleidziam work
      this.handleWorkCountdown();
    }
    else if (this.state.runningRest && this.timer && this.state.pause) {
      this.setState({ pause: false })
      //paleidziam rest
      this.handleRestCountdown();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //handle Work countdown
    if (this.state.runningWork !== prevState.runningWork && !this.state.runningRest) {
      switch (this.state.runningWork) {
        case true:
          this.handleWorkCountdown();
      }
    }
    if (this.state.countWork === 0 && this.state.runningWork) {
      this.handleWorkStop();
    }

    //handle Rest countdown
    if (this.state.runningRest !== prevState.runningRest && !this.state.runningWork) {
      switch (this.state.runningRest) {
        case true:
          this.handleRestCountdown();
      }
    }
    if (this.state.countRest === 0 && this.state.runningRest) {
      this.handleRestStop();
    }

  } //componentDidUpdate ENDS

  handleWorkCountdown() {
    this.playLongBeep();
    this.timer = setInterval(() => {
      const newWork = this.state.countWork - 1;
      this.setState(
        { countWork: newWork >= 0 ? newWork : 0 }
      );
      if (this.state.countWork <= 3) {
        this.playShortBeep();
      }
    }, 1000);
  }

  handleRestCountdown() {
    this.timer = setInterval(() => {
      const newRest = this.state.countRest - 1;
      this.setState(
        { countRest: newRest >= 0 ? newRest : 0 }
      );
    }, 1000);
  }

  handleWorkStop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.state.runningWork === true) {
      this.setState({ runningWork: false });
    }
    if (this.state.countRest > 0 && this.state.runningRest === false) {
      this.setState({ runningRest: true });
    }
  }

  handleRestStop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.state.runningRest === true) {
      this.setState({ runningRest: false });
    }
    if (this.state.countSets > 1 && this.state.runningWork === false) {
      this.setState({ countSets: this.state.countSets - 1, countWork: this.state.work, countRest: this.state.rest, runningWork: true });
    }
  }

  playLongBeep() {
    var audio = new Audio('https://raw.githubusercontent.com/adasiurna/sounds/master/beep-01a.mp3');
    audio.play();
  }
  playShortBeep() {
    var audio = new Audio('https://raw.githubusercontent.com/adasiurna/sounds/master/beep-07.mp3');
    audio.play();
  }

  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }

  render() {
    const { work } = this.state;
    const { rest } = this.state;
    return (
      <div class="container">
        <div id="settings">
          <div class="set box">
            <div id="set-label" class="label">Sets</div>
            <div class="box-flex">
              <div id="set-decrement" onClick={this.decSets} class="calc-sign">[-]</div>
              <div id="set-length" class="length">{this.state.sets}</div>
              <div id="set-increment" onClick={this.incSets} class="calc-sign">[+]</div>
            </div>
          </div>
          <div class="session box">
            <div id="session-label" class="label">Work</div>
            <div class="box-flex">
              <div id="session-decrement" onClick={this.decWork} class="calc-sign">[-]</div>
              <div id="session-length" class="length">{this.format(work)}</div>
              <div id="session-increment" onClick={this.incWork} class="calc-sign">[+]</div>
            </div>
          </div>
          <div class="break box">
            <div id="break-label" class="label">Rest</div>
            <div class="box-flex">
              <div id="break-decrement" onClick={this.decRest} class="calc-sign">[-]</div>
              <div id="break-length" class="length">{this.format(rest)}</div>
              <div id="break-increment" onClick={this.incRest} class="calc-sign">[+]</div>
            </div>
          </div>
        </div>

        <div id="start_stop" onClick={this.handleStartStop} class="button">Start / Stop</div>
        <div id="reset" onClick={this.handleReset} class="button">Reset</div>
        <Timer
          sets={this.state.countSets}
          work={this.state.countWork}
          rest={this.state.countRest}
          runningWork={this.state.runningWork}
          runningRest={this.state.runningRest}
        />
      </div>
    );
  }
};

export default App;