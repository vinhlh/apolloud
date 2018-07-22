# Apolloud
Shuffle play all SoundCloud tracks liked by an user.

## Usage
- Install via `yarn global add apolloud`

- Run `apolloud userName`
Example: `apolloud vinhlh`.

## Limits

Underneath, we are using `Puppeteer` to launch a Chromium instance.

### Slow install
When you install Apolloud, it downloads a recent version of Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win).

### Slow start
It will takes around 10 seconds.

## Contributing
- `yarn dev` to compile automatically.

- Run `yarn run` to run the app whenever you need.
