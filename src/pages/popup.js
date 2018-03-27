'use strict'

import { parseUrl } from '../modules/utils'

chrome.runtime.onMessage.addListener(message => {
  if (message.type === "setConfig") {
    configUpdate(message.config)
  }
})
sendMessage({type: "getConfig"})


function configUpdate(config) {
  getCurrentTab().then(tab => {
    let urlInfo = parseUrl(tab.url)
    document.getElementById('domain').innerHTML = "Domain: " + urlInfo.domain
    document.getElementById('url').innerHTML = "URL: " + urlInfo.page
  })
  document.getElementById('clean-mode-btn').innerHTML = 'Clean Mode ' + (config.cleanModeOn ? 'ON' : 'OFF')
  document.getElementById('read-mode-btn').innerHTML = 'Read Mode ' + (config.readModeOn ? 'ON' : 'OFF')
  displayPanel()
}

function displayPanel() {
  document.getElementById('loading-screen').style.display = 'none'
  document.getElementById('general-settings').style.display = 'block'
}


function sendMessage(message, callback) {
  getCurrentTab().then(tab => {
    chrome.tabs.sendMessage(tab.id, message, callback)
  })
}

function getCurrentTab() {
  return new Promise(resolve => {
    chrome.tabs.query({ currentWindow: true, highlighted: true }, (tabs) => {
      resolve(tabs[0])
    })
  })
}



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('clean-mode-btn').addEventListener('click', switchCleanMode)
  document.getElementById('read-mode-btn').addEventListener('click', switchReadMode)
  document.getElementById('sniffer-btn').addEventListener('click', hideNewElement)
})

function switchCleanMode() {
  sendMessage({type: "switchCleanMode"})
}

function switchReadMode() {
  sendMessage({type: "switchReadMode"})
}

function hideNewElement() {
  sendMessage({type: "hideNewElement"}, () => {
    window.close()
  })
}
