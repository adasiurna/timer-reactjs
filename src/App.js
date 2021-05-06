import React from 'react'
import Settings from './Settings'
import Timer from './Timer'
import './App.css'

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
      displayTimer: false,
      runningWork: false,
      runningRest: false,
      pause: false
    }
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleWorkCountdown = this.handleWorkCountdown.bind(this);
    this.handleRestCountdown = this.handleRestCountdown.bind(this);
    this.handleWorkStop = this.handleWorkStop.bind(this);
    this.handleRestStop = this.handleRestStop.bind(this);
    this.playLongBeep = this.playLongBeep.bind(this);
    this.playShortBeep = this.playShortBeep.bind(this);
  }

  incSets = () => this.state.sets < 99 ?
    this.setState({ sets: this.state.sets + 1 }) :
    this.setState({ sets: this.state.sets })

  decSets = () => this.state.sets > 1 ?
    this.setState({ sets: this.state.sets - 1 }) :
    this.setState({ sets: this.state.sets })

  incWork = () => this.state.work < 3599 ?
    this.setState({ work: this.state.work + 1 }) :
    this.setState({ work: this.state.work })

  decWork = () => this.state.work > 5 ?
    this.setState({ work: this.state.work - 1 }) :
    this.setState({ work: this.state.work })

  incRest = () => this.state.rest < 3599 ?
    this.setState({ rest: this.state.rest + 1 }) :
    this.setState({ rest: this.state.rest })

  decRest = () => this.state.rest > 0 ?
    this.setState({ rest: this.state.rest - 1 }) :
    this.setState({ rest: this.state.rest })

  handleReset() {
    this.setState({ sets: 10, work: 15, rest: 5, countSets: 10, countWork: 15, countRest: 5, runningWork: false, displayTimer: false, runningRest: false, pause: false });
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  handleStartStop() {
    if (!this.state.runningWork && !this.state.runningRest && !this.state.pause) {
      this.setState({ countSets: this.state.sets, countWork: this.state.work, countRest: this.state.rest, displayTimer: true, runningWork: true });
    }
    else if ((this.state.runningWork || this.state.runningRest) && this.timer && !this.state.pause) {
      this.setState({ pause: true })
      clearInterval(this.timer);
    }
    else if (this.state.runningWork && this.timer && this.state.pause) {
      this.setState({ pause: false })
      this.handleWorkCountdown();
    }
    else if (this.state.runningRest && this.timer && this.state.pause) {
      this.setState({ pause: false })
      this.handleRestCountdown();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.runningWork !== prevState.runningWork && !this.state.runningRest) {
      if (this.state.runningWork) {
        this.handleWorkCountdown();
      }
    }
    if (this.state.countWork === 0 && this.state.runningWork) {
      this.handleWorkStop();
    }
    if (this.state.runningRest !== prevState.runningRest && !this.state.runningWork) {
      if (this.state.runningRest) {
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


  render() {
    return (
      <div className="container">
        <Settings
          sets={this.state.sets}
          work={this.state.work}
          rest={this.state.rest}
          ONincSets={this.incSets}
          ONdecSets={this.decSets}
          ONincWork={this.incWork}
          ONdecWork={this.decWork}
          ONincRest={this.incRest}
          ONdecRest={this.decRest} />

        {this.state.displayTimer &&
          <Timer
            sets={this.state.countSets}
            work={this.state.countWork}
            rest={this.state.countRest}
            runningWork={this.state.runningWork}
            runningRest={this.state.runningRest}
          />}

        <div id="start_stop" onClick={this.handleStartStop} className="button">Start / Stop</div>
        <div id="reset" onClick={this.handleReset} className="button">Reset</div>

      </div>
    );
  }
};

export default App;