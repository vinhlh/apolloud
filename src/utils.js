import chalk from 'chalk'
import packageInfo from '../package.json'

const KEYPRESS_VALUE_CTRL_C = '\u0003'

const TYPE_LIKES = 'likes'
const TYPE_ALL = 'all'

const validTypes = [TYPE_LIKES, TYPE_ALL]

const listenKeyPress = ({ onPressToggle, onPressNext, onClose }) => {
  const { stdin } = process

  stdin.setRawMode(true)
  stdin.resume()
  stdin.setEncoding('utf8')

  stdin.on('data', async key => {
    if (key === KEYPRESS_VALUE_CTRL_C) {
      await onClose()
      process.exit()
    }

    if (['p', 'P'].includes(key)) {
      await onPressToggle()
    }

    if (['n', 'N'].includes(key)) {
      await onPressNext()
    }

    process.stdout.write(key)
  })
}

const usage = chalk`
  Shuffle play all SoundCloud tracks liked by an user via command line.

  {magenta Usage}
    ❯ {blue apolloud} {yellow <username>} {cyan <trackType>}

    {cyan <trackType>} can be:
      {white likes} (default) | {white all}

  {magenta Examples}
    ❯ {blue apolloud} {yellow vinlh}
    ❯ {blue apolloud} {yellow vinlh} {cyan all}
    ❯ {blue apolloud} {yellow vinlh} {cyan likes}
`

const validateCmdArgs = (userName, trackType) => {
  if (userName === '-v') {
    console.log(chalk`
  {blue Apolloud} {magenta v${packageInfo.version}} by {yellow vinhlh}
`)
    return false
  }

  if (userName === '-h') {
    console.log(usage)
    return false
  }

  if (!userName) {
    console.log(chalk`
  {red SoundCloud user name is required!}
${usage}
    `)
    return false
  }

  if (!validTypes.includes(trackType)) {
    console.log(chalk`
  {red Invalid track type provided!}
${usage}
`)
    return false
  }

  return true
}

export { TYPE_ALL, TYPE_LIKES, listenKeyPress, validateCmdArgs }
