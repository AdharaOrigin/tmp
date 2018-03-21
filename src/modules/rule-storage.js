'use strict'

import { parseUrl } from './utils'

const RuleStorage = {
  //rules: loadFromStorage()
  rules: {
    'home': {
      'perma': {
        0: {
          'name': 'Delete p1',
          'operation': 'delete',
          'xobj': { 'xpath': '/html/body/section[2]/div/div[1]' }
        }
      },
      'purif': {
        'name': 'Delete Logo',
        'operation': 'delete',
        'xobj': { 'xpath': '/html/body/header' }
      },
      'config': { 'perma-on': true }
    }
  },

  getRules: function getRules(url) {
    let domain = parseUrl(url).domain
    if (this.rules.hasOwnProperty(domain)) {
      return this.rules[domain]
    }
    return {}
  }
}

export default RuleStorage


/*
  loadFromStorage: function loadFromStorage(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (response) => {
        if (Object.keys(response).length === 0) {
          resolve({})
        } else {
          resolve(response[key])
        }
      })
    })
  },
  initStorage: function initStorage() {
    chrome.storage.sync.set(RuleStorage.rules)
  },

  clearStorage: function clearStorage(done) {
    chrome.storage.sync.clear()
    done()
  },


  isPermaOn: function isPermaOn(domain) {
    return this.rules[domain].applyPerma
  },

  setPerma: function setPerma(domain, value) {
    this.rules[domain].applyPerma = value
  },

  getRules: async function getRules(url) {
    const web = parseUrl(url)
    const domainRules = this.loadFromStorage('domain:' + web.domain)
    const urlRules = this.loadFromStorage('page:' + web.page)

    return {}
    // return this.mergeRules(await domainRules, await urlRules)
  }
 */
