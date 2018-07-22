import terminalLink from 'terminal-link'

import PlayerUI from './PlayerUI'
import Browser from './Browser'
import { listenKeyPress } from './utils'

const UPDATE_PLAYER_STATE_INTERVAL = 1000

const runApp = async () => {
  const player = new PlayerUI()
  const browser = new Browser()

  await browser.init()
  await browser.viewUser('vinhlh')
  await browser.enableSuffle(player)

  await browser.triggerPlay()
  player.setState({ playing: true })

  setInterval(async () => {
    const nextPlayerState = await browser.fetchPlayerState()

    player.setState(nextPlayerState)
  }, UPDATE_PLAYER_STATE_INTERVAL)

  listenKeyPress({
    onPressToggle() {
      browser.tooglePlay()
      player.setState({ playing: !player.state.playing })
    },
    onPressNext() {
      browser.nextTrack()
    }
  })
}

export default runApp
