import chalk from 'chalk'

const KEYPRESS_VALUE_CTRL_C = '\u0003'

const TYPE_LIKES = 'likes'
const TYPE_ALL = 'all'

const validTypes = [TYPE_LIKES, TYPE_ALL]

const listenKeyPress = ({ onPressToggle, onPressNext }) => {
  const { stdin } = process

  stdin.setRawMode(true)
  stdin.resume()
  stdin.setEncoding('utf8')

  stdin.on('data', function(key) {
    if (key === KEYPRESS_VALUE_CTRL_C) {
      process.exit()
    }

    if (['p', 'P'].includes(key)) {
      onPressToggle()
    }

    if (['n', 'N'].includes(key)) {
      onPressNext()
    }

    process.stdout.write(key)
  })
}

const validateCmdArgs = (userName, trackType) => {
  if (!userName) {
    console.error(chalk`SoundCloud user name is required!
  Example: {yellow apolloud vinhlh}.
    `)
    return false
  }

  if (!validTypes.includes(trackType)) {
    console.error(chalk`Invalid track type provided! Supported types: {yellow ${validTypes.join(
      ', '
    )}}
`)
    return false
  }

  return true
}

export { TYPE_ALL, TYPE_LIKES, listenKeyPress, validateCmdArgs }
