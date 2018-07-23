import puppeteer from 'puppeteer'

import { TYPE_LIKES, TYPE_ALL } from './utils'

class Browser {
  async init() {
    await this.initBrowser()
    await this.initPage()
  }

  dontLoadRedundantResources(request) {
    const resourceType = request.resourceType()
    if (['image', 'stylesheet'].includes(resourceType)) {
      return request.abort()
    }

    request.continue()
  }

  async initBrowser() {
    this.browser = await puppeteer.launch({
      ignoreDefaultArgs: true,
      args: puppeteer.defaultArgs(),
      headless: true
    })
  }

  async viewUser(user) {
    await this.page.goto('https://soundcloud.com/' + user)
  }

  async initPage() {
    this.page = await this.browser.newPage()
    this.page.setViewport({
      width: 10,
      height: 10
    })
    await this.page.setRequestInterception(true)

    this.page.on('request', this.dontLoadRedundantResources)
  }

  async fetchPlayerState() {
    return await this.page.evaluate(() => ({
      timePassed: document.querySelector(
        '.playbackTimeline__timePassed span:nth-child(2)'
      ).textContent,
      duration: document.querySelector(
        '.playbackTimeline__duration span:nth-child(2)'
      ).textContent,
      title: document
        .querySelector('.playbackSoundBadge__titleLink')
        .getAttribute('title')
    }))
  }

  getFirstTrackSelectorByType(type) {
    return {
      [TYPE_LIKES]: '.soundBadgeList__item .playButton',
      [TYPE_ALL]: '.userStreamItem .playButton'
    }[type]
  }

  async triggerPlay(trackType) {
    const firstTrackSelector = this.getFirstTrackSelectorByType(trackType)
    await this.page.evaluate(selector => {
      document.querySelector(selector).click()
    }, firstTrackSelector)
  }

  async enableShuffle() {
    await this.page.evaluate(() => {
      document.querySelector('.shuffleControl').click()
    })
  }

  async tooglePlay() {
    await this.page.evaluate(() => {
      document.querySelector('.playControl').click()
    })
  }

  async nextTrack() {
    await this.page.evaluate(() => {
      document.querySelector('.playControls__next').click()
    })
  }
}

export default Browser
