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
    document.getElementById('url').innerHTML = urlInfo.page
  })
  document.getElementById('clean-mode-btn').innerHTML = 'Clean Mode ' + (config.cleanModeOn ? 'ON' : 'OFF')
  document.getElementById('read-mode-btn').innerHTML = 'Read Mode ' + (config.readModeOn ? 'ON' : 'OFF')

  document.getElementById('clean-rules-list').innerHTML = ''
  Object.keys(config.cleanRules).forEach(key => {
    let rule = config.cleanRules[key]
    let ruleHtml = '<li>' + key + ': ' + rule['operation'] + ' ' + rule['name'] +
      ' [<option value="'+key+'" class="deleteClean">delete</option>]</li>'
    document.getElementById('clean-rules-list').innerHTML += ruleHtml
  })

  document.getElementById('read-rules-list').innerHTML = ''
  Object.keys(config.readRules).forEach(key => {
    let rule = config.readRules[key]
    let ruleHtml = '<li>' + key + ': ' + rule['operation'] + ' ' + rule['name'] +
      ' [<option value="'+key+'" class="deleteRead">delete</option>]</li>'
    document.getElementById('read-rules-list').innerHTML += ruleHtml
  })

  Array.from(document.getElementsByClassName('deleteClean')).forEach(function(elem) {
    elem.addEventListener('click', function() { deleteRule('cleanRules', this.value) })
  })
  Array.from(document.getElementsByClassName('deleteRead')).forEach(function(elem) {
    elem.addEventListener('click', function() { deleteRule('readRules', this.value) })
  })

  displayPanel()
}

function deleteRule(ruleType, id) {
  sendMessage({ 'type': 'deleteRule', 'ruleType': ruleType, 'id': id })
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
  document.getElementById('add-clean-rule-btn').addEventListener('click', () => { hideNewElement('cleanRules') })
  document.getElementById('add-read-rule-btn').addEventListener('click', () => { hideNewElement('readRules') })
})

function switchCleanMode() {
  sendMessage({'type': "switchCleanMode"})
}

function switchReadMode() {
  sendMessage({'type': "switchReadMode"})
}

function hideNewElement(ruleType) {
  sendMessage({'type': 'turnOnCleanMode'})
  sendMessage({'type': 'hideNewElement', 'ruleType': ruleType }, () => {
    window.close()
  })
}
