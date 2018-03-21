'use strict'

import Message from '../modules/messages'
import { parseUrl } from '../modules/utils'

let page = {}
// const backgroundPage = chrome.extension.getBackgroundPage()

chrome.tabs.query({ currentWindow: true, highlighted: true }, (tabs) => {
  page.tab = tabs[0]
  page.url = parseUrl(page.tab.url)
  page.permaModeOn = true
  page.purifyModeOn = true

  updateView()
})


function updateView() {
  document.getElementById('domain').innerHTML += page.url.domain
  document.getElementById('url').innerHTML += page.url.page
  document.getElementById('perma-mode-btn').innerHTML = 'Perma MODE ' + (page.permaModeOn ? 'ON' : 'OFF')
  document.getElementById('purify-mode-btn').innerHTML = 'Purify MODE ' + (page.purifyModeOn ? 'ON' : 'OFF')
}

document.addEventListener('DOMContentLoaded', function() {
  let link = document.getElementById('purify-mode-btn');
  link.addEventListener('click', turnPurifyMode)
})

function turnPurifyMode() {
  page.purifyModeOn = !page.purifyModeOn
  document.getElementById('purify-mode-btn').innerHTML = 'Purify MODE ' + (page.purifyModeOn ? 'ON' : 'OFF')
}


/*
function getPurifyModeState() {
  return new Promise((resolve => {
    chrome.runtime.sendMessage(Message.create(Message.types.getPurifyState), (state) => {
      resolve(state)
    })
  }))
}

syncPopupWithTab(page.tab)
function syncPopupWithTab(tab) {
  let parsedUrl = parseUrl(tab.url)
  document.getElementById('domain').innerHTML += parsedUrl.domain
  document.getElementById('url').innerHTML += parsedUrl.page

  let permaOn = backgroundPage.RuleStorage.isPermaOn(parsedUrl.domain)

  document.getElementById('perma-mode-btn').innerHTML = 'Perma MODE ' + (permaOn ? 'ON' : 'OFF')
  document.getElementById('purify-mode-btn').innerHTML = 'Purify MODE '
}

// onclick: send message to apply changes
// callback: if (true)  change internal value
//           if (false) reload internal values
//           update screen
//
// messages targets:
// perma => RuleStorage, purify => content script
// both  => DOM manipulator (meaby non-existent)

function tooglePurifyMode() {
  let permaOn = backgroundPage.RuleStorage.isPermaOn(parsedUrl.domain)
  backgroundPage.RuleStorage.setPerma(!permaOn)
  document.getElementById('perma-mode-btn').innerHTML = 'Perma MODE ' + (permaOn ? 'ON' : 'OFF')
}

document.addEventListener('DOMContentLoaded', function() {
  let link = document.getElementById('perma-mode-btn');
  link.addEventListener('click', tooglePurifyMode)
})

chrome.runtime.onMessage.addListener((message) => {
  switch (Message.getType(message)) {
  default:
    break;
  }
})
*/
// document.getElementById('extActionBtn').innerHTML = 'Extension ' + page.extension ? 'ON' : 'OFF'
