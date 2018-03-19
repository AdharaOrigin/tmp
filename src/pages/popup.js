'use strict'

import Message from '../modules/messages'
import { parseUrl } from '../modules/utils'

let currentTab = {}
const backgroundPage = chrome.extension.getBackgroundPage()

chrome.tabs.query({ currentWindow: true, highlighted: true }, (tabs) => {
  currentTab = tabs[0]
  syncPopupWithTab(currentTab)
})


function syncPopupWithTab(tab) {
  const parsedUrl = parseUrl(tab.url)
  document.getElementById('domain').innerHTML += parsedUrl.domain
  document.getElementById('url').innerHTML += parsedUrl.page

  const tabConfig = backgroundPage.tabsConfig.getTab(tab.id)
  document.getElementById('perma-mode-btn').innerHTML = 'Perma MODE ' + (tabConfig.perma ? 'ON' : 'OFF')
  document.getElementById('purify-mode-btn').innerHTML = 'Purify MODE ' + (tabConfig.purify ? 'ON' : 'OFF')
}

function changeit() {
  const tabConfig = backgroundPage.tabsConfig.getTab(currentTab.id)
  tabConfig.perma = !tabConfig.perma
  document.getElementById('perma-mode-btn').innerHTML = 'Perma MODE ' + (tabConfig.perma ? 'ON' : 'OFF')
}

document.addEventListener('DOMContentLoaded', function() {
  let link = document.getElementById('perma-mode-btn');
  link.addEventListener('click', changeit)
})

chrome.runtime.onMessage.addListener((message) => {
  switch (Message.getType(message)) {
  default:
    break;
  }
})

// document.getElementById('extActionBtn').innerHTML = 'Extension ' + config.extension ? 'ON' : 'OFF'
