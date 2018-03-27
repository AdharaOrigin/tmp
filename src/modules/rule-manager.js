'use strict'

const ruleContentStub = {
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
        'obj': { 'xpath': '/html/body/header/div/div/h1/a/img' }
      }
    }
  }
}


const RuleManager = {

  initStorage: function initStorage() {
    Object.keys(ruleContentStub).forEach(key => {
      chrome.storage.local.set({ key: ruleContentStub[key] })
    })
  },

  getRules: function getRules(domain) {
    return new Promise((resolve) => {
      chrome.storage.local.get(domain, rules => {
        if (Object.keys(rules).length === 0) {
          resolve({})
        } else {
          resolve(JSON.parse(rules[domain]))
        }
      })
    })
  }

}

export default RuleManager
