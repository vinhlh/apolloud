import chalk from 'chalk'
import ora from 'ora'
import logUpdate from 'log-update'

class PlayerUI {
  constructor() {
    this.state = {
      title: 'N/A',
      timePassed: '-',
      duration: '-',
      playing: false,
      log: '',
      collection: []
    }

    this.spinner = ora({
      spinner: 'dots',
      text: 'Initializing Apolloud player (will take ~ 10 seconds)'
    }).start()
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    }

    this.render()
  }

  renderPlayStatus = () => {
    const { playing } = this.state

    return playing
      ? chalk`{bgBlue.white  ► Playing }`
      : chalk`{bgRed.white  ❚❚ Paused }`
  }

  renderTimePassed = () => {
    const { timePassed, duration } = this.state
    return chalk`{blue  ${timePassed}}/{gray ${duration}}`
  }

  renderTrackName = () => {
    const { title } = this.state
    return chalk`{green.bold ${title}}`
  }

  renderCredit() {
    return chalk`{gray @ {bold Apolloud} by {bold vinhlh}. Press {bold P} to toggle pause/play, {bold N} to next.}`
  }

  render() {
    this.spinner.text = `
${this.renderPlayStatus()} ${this.renderTimePassed()} ${this.renderTrackName()}

${this.renderCredit()}
    `
  }
}

export default PlayerUI
