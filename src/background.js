'use strict'

import Message from './modules/messages'
import RuleManager from './modules/rule-storage'
// import { tabsConfiguration } from './modules/tabs-config'

const tabProto = {
  setReady() {
  },
  toggleActive() {
  }
}

function tabsConfiguration() {
  var tabs = {}
  return
}

const extensionActive = true
const tabsConfig = tabsConfiguration()

// noinspection JSUndefinedPropertyAssignment
chrome.extension.getBackgroundPage().tabsConfig = tabsConfig


chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    RuleManager.initStorage()
  }
})

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!extensionActive) {
    return
  }

  switch (Message.getType(message)) {
  case Message.types.newPageLoading:
    console.log(`Asking for rules for: ${sender.url}`)
    RuleManager.getRules(sender.url)
      .then((rules) => {
        if (Object.keys(rules).length > 0) {
          tabsConfig.addTab(sender.tab.id, false, rules.extConfig)
          console.log('Injecting DOM manipulator.')
          chrome.tabs.executeScript(sender.tab.id, { file: 'dom-manipulator.js' }, () => {
            chrome.tabs.sendMessage(sender.tab.id, Message.create(Message.types.initRules, rules))
          })
        } else {
          tabsConfig.addTab(sender.tab.id, true)
          console.log(`No rules found.`)
        }
      })
      .catch((e) => {
        console.log(e)
      })
    break

  case Message.types.rulesInitialized:
    tabsConfig.setTabReady(sender.tab.id)
    break

  default:
    console.log('Message of unknown type recived: ' + JSON.stringify(message))
  }
})

chrome.tabs.onRemoved.addListener((message, sender) => {
  try {
    tabsConfig.removeTab(sender.tab.id)
  }
  catch (e) {
    console.log(e)
  }
})
