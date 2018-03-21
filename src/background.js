'use strict'

import Message from './modules/messages'
import RuleManager from './modules/rule-storage'

const extensionActive = true

/*
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    RuleManager.initStorage()
  }
})
*/

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!extensionActive) {
    return
  }

  switch (Message.getType(message)) {
  case Message.types.newPageLoading:
    console.log(`Asking for rules for: ${sender.url}`)
    let rules = RuleManager.getRules(sender.url)
    if (Object.keys(rules).length > 0) {
      console.log(rules)
    } else {
      console.log(`No rules found.`)
    }
    break

  default:
    console.log('Message of unknown type recived: ' + JSON.stringify(message))
  }
})

// chrome.tabs.executeScript(sender.tab.id, { file: 'dom-manipulator.js' }, () => {
//   chrome.tabs.sendMessage(sender.tab.id, Message.create(Message.types.initRules, rules))
// })

// noinspection JSUndefinedPropertyAssignment
// chrome.extension.getBackgroundPage().whatPerma = function whatPerma(domain) {
//   return RuleManager.isPermaOn(domain)
// }
