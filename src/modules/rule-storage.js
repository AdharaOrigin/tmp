'use strict'

import { parseUrl } from './utils'

const RuleStorage = {
  ruleStoreContentPrototype: {
    'domain:home': {
      'extConfig': {
        'perma': true,
        'purify': false
      },
      'perma': {
        'delete': [
          { 'xpath': '/html/body/header/div/div/h1/a/img' }
        ]
      },
      'purify': {
        'delete': [
          { 'xpath': '/html/body/header/div/nav/ul' }
        ]
      }
    },
    'page:home/head/Development/purify/jekyll.htm': {
      'perma': {
        'delete': [
          { 'xpath': '/html/body/section[1]/div/div/p' }
        ]
      }
    }
  },

  initStorage: function initStorage() {
    chrome.storage.sync.set(RuleStorage.ruleStoreContentPrototype)
  },

  clearStorage: function clearStorage(done) {
    chrome.storage.sync.clear()
    done()
  },

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

  mergeRules: function mergeRules(domainRules, urlRules) {
    const merged = Object.assign({}, domainRules)

    Object.keys(urlRules).forEach((key1) => {
      if (merged.hasOwnProperty(key1)) {
        Object.keys(urlRules[key1]).forEach((key2) => {
          if (merged[key1].hasOwnProperty(key2)) {
            merged[key1][key2] = merged[key1][key2].concat(urlRules[key1][key2])
          } else {
            merged[key1][key2] = urlRules[key1][key2]
          }
        })
      } else {
        merged[key1] = urlRules[key1]
      }
    })

    return merged
  },

  getRules: async function getRules(url) {
    const web = parseUrl(url)
    const domainRules = this.loadFromStorage('domain:' + web.domain)
    const urlRules = this.loadFromStorage('page:' + web.page)

    return this.mergeRules(await domainRules, await urlRules)
  }
}

export default RuleStorage
