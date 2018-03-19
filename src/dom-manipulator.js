'use strict'

import Message from './modules/messages'
import XObjMaster from './modules/xobj-master'

const domManipulator = {
  config: {
    'perma': false,
    'purify': false
  },

  initialize(rules) {
    const initialConfig = rules['extConfig']
    this.rules = rules
    delete this.rules['extConfig']

    Object.keys(this.rules).forEach((scope) => {
      Object.keys(this.rules[scope]).forEach((operationType) => {
        Object.keys(this.rules[scope][operationType]).forEach((xobj, index) => {
          this.rules[scope][operationType][index] = XObjMaster.findElement(this.rules[scope][operationType][index])
        })
      })
    })

    this.handleConfigChange(initialConfig)
    chrome.runtime.sendMessage(Message.create(Message.types.rulesInitialized, this.config))
  },

  handleConfigChange(newConfig) {
    Object.keys(newConfig).forEach((scope) => {
      if (!this.config[scope] && newConfig[scope]) {
        this.applyRules(this.rules[scope])
        this.config[scope] = newConfig[scope]
      } else if (this.config[scope] && !newConfig[scope]) {
        this.removeRules(this.rules[scope])
        this.config[scope] = newConfig[scope]
      }
    })
  },

  applyRules(rules) {
    Object.keys(rules).forEach((operationType) => {
      rules[operationType].forEach((element) => {
        element.default = element.htmlElement.style.display
        element.htmlElement.style.display = 'none'
      })
    })
  },

  removeRules(rules) {
    Object.keys(rules).forEach((operationType) => {
      rules[operationType].forEach((element) => {
        element.htmlElement.style.display = element.default
      })
    })
  }
}

chrome.runtime.onMessage.addListener((message) => {
  switch (Message.getType(message)) {
  case Message.types.initRules:
    console.log('State: ' + document.readyState)
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      domManipulator.initialize(Message.getArgs(message))
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        domManipulator.initialize(Message.getArgs(message))
      })
    }

    break

  default:
    console.log('Message of unknown type recived: ' + JSON.stringify(message))
  }
})
