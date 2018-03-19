'use strict'



function TabConfig(id) {
  let tabs = {}

  function validId(id) {
    if (tabs.hasOwnProperty(id)) {
      return true
    } else {
      console.log('Invalid ID')
    }
  }

  function Tab(ready, rules = {}) {
    let _ready = ready, _rules = rules

    return {
      setReady() {
        _ready = true
      }
    }
  }

  return {
    addTab(id, ready, rules = {}) {
      if (!tabs.hasOwnProperty(id)) {
        tabs[id] = content
      }
    },
    deleteTab(id) {
      if (validId(id)) {
        delete tabs[id]
      }
    },
    getTab(id) {
      if (validId(id)) {
        return tabs[id]
      }
    }
  }
}


let tabs = TabConfig()
tabs.addTab(7, 'tits')

let tab = tabs.getTab(7)
console.log(tab)

console.log('---------')

// ready, rules = {}

//setReady() {
//  _ready = true
//},
