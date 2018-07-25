import chalk from 'chalk'

import PlayerUI from './PlayerUI'
import Browser from './Browser'
import { TYPE_LIKES, validateCmdArgs, listenKeyPress } from './utils'

const UPDATE_PLAYER_STATE_INTERVAL = 1000

const runApp = async (userName, trackType = TYPE_LIKES) => {
  if (!validateCmdArgs(userName, trackType)) {
    return
  }

  const player = new PlayerUI()
  const browser = new Browser()

  await browser.init()
  await browser.viewUser(userName)
  await browser.enableShuffle()

  await browser.triggerPlay(trackType)
  player.setState({ playing: true })

  setInterval(async () => {
    const nextPlayerState = await browser.fetchPlayerState()

    player.setState(nextPlayerState)
  }, UPDATE_PLAYER_STATE_INTERVAL)

  listenKeyPress({
    onPressToggle: async () => {
      await browser.tooglePlay()
      player.setState({ playing: !player.state.playing })
    },
    onPressNext: async () => {
      await browser.nextTrack()
    },
    onClose: async () => {
      await browser.close()
    }
  })
}

export default runApp
