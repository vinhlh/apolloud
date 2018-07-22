const KEYPRESS_VALUE_CTRL_C = '\u0003'

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

export { listenKeyPress }
