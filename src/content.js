'use strict'

import ObjectMaster from './modules/xobj-master'
import DomProbe from './modules/dom-sniffer'

function loadRules() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({type: 'getPageRules', url: location.href}, rules => {
      if (Object.keys(rules).length === 0) {
        resolve({
          cleanModeOn: false,
          readModeOn: false,
          cleanRules: {},
          readRules: {}
        })
      } else {
        resolve({
          cleanModeOn: rules['cleanModeOn'],
          readModeOn: false,
          cleanRules: rules['cleanRules'],
          readRules: rules['readRules']
        })
      }
    })
  })
}


const domManipulator = {
  rules: undefined,

  initRules: async function initRules() {
    let domLoaded = new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', () => { resolve(0) })
    })
    this.rules = await loadRules()

    await domLoaded
    this.findHtmlElements(this.rules['cleanRules'])
    this.findHtmlElements(this.rules['readRules'])

    if (this.rules.cleanModeOn)
      this.applyRules('cleanRules')

    chrome.runtime.onMessage.addListener((message) => {
      switch(message.type) {
        case "getConfig":
          chrome.runtime.sendMessage({ 'type': 'setConfig', 'config': this.rules })
          break

        case "switchCleanMode":
          this.switchCleanMode()
          break

        case "switchReadMode":
          this.switchReadMode()
          break

        default:
          break
      }
    })

    chrome.runtime.sendMessage({ 'type': 'setConfig', 'config': this.rules})
  },

  findHtmlElements: function findHtmlElements(rules) {
    Object.keys(rules).forEach(id => {
      rules[id].element = ObjectMaster.findElement(rules[id].obj)
    })
  },

  switchCleanMode: function switchCleanMode() {
    this.rules.cleanModeOn = !this.rules.cleanModeOn
    if (this.rules.cleanModeOn) {
      this.applyRules('cleanRules')
    } else {
      this.removeRules('cleanRules')
    }
    chrome.runtime.sendMessage({ 'type': 'setConfig', 'config': this.rules})
  },

  switchReadMode: function switchReadMode() {
    this.rules.cleanReadOn = !this.rules.cleanReadOn
    if (this.rules.cleanReadOn) {
      this.applyRules('readRules')
    } else {
      this.removeRules('readRules')
    }
    chrome.runtime.sendMessage({ 'type': 'setConfig', 'config': this.rules})
  },

  applyRules: function applyRules(scope) {
    Object.keys(this.rules[scope]).forEach(key => {
      let rule = this.rules[scope][key]
      if (rule.operation === 'delete') {
        rule.defaultStyle = rule.element.style.display
        rule.element.style.display = 'none'
      } else {
        rule.defaultStyle = rule.element.style.visibility
        rule.element.style.visibility = 'hidden'
      }
    })
  },

  removeRules: function removeRules(scope) {
    Object.keys(this.rules[scope]).forEach(key => {
      let rule = this.rules[scope][key]
      if (rule.operation === 'delete') {
        rule.element.style.display = rule.defaultStyle
      } else {
        rule.element.style.visibility = rule.defaultStyle
      }
    })
  },

}.initRules()


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch(message.type) {
    case "hideNewElement":
      DomProbe.startProbing()
      sendResponse()
      break
  }
})
