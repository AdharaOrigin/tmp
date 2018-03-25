'use strict'

import Message from './modules/messages'
import RuleManager from './modules/rule-manager'

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    RuleManager.initStorage()
  }
})

let rules = {
  'home': {
    'cleanModeOn': true,
    'cleanRules': {
      0: {
        'name': 'Delete p1',
        'operation': 'delete',
        'obj': { 'xpath': '/html/body/section[2]/div/div[1]' }
      }
    },
    'readRules': {
      1: {
        'name': 'Delete Logo',
        'operation': 'delete',
        'obj': { 'xpath': '/html/body/header' }
      }
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'getDomainRules':
      sendResponse(rules[message.domain])
      break

    default:
      console.log('Message of unknown type recived: ' + JSON.stringify(message))
  }
})



/*
const extensionActive = true

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
      chrome.tabs.executeScript(sender.tab.id, { file: 'dom-manipulator.js' }, () => {
        chrome.tabs.sendMessage(sender.tab.id, Message.create(Message.types.initRules, rules))
      })
    } else {
      console.log(`No rules found.`)
    }
    break

  default:
    console.log('Message of unknown type recived: ' + JSON.stringify(message))
  }
})
*/


// noinspection JSUndefinedPropertyAssignment
// chrome.extension.getBackgroundPage().whatPerma = function whatPerma(domain) {
//   return RuleManager.isPermaOn(domain)
// }
