'use-strict'

/*
export function tabsConfiguration() {
  var tabs = {}

  return {
    idValid(id) {
      if (tabs.hasOwnProperty(id)) {
        return true
      } else {
        console.log('Invalid tab id: ' + id)
      }
    },
    addTab(id, ready, rules = {}) {
      tabs[id] = Object.assign(rules, { ready: ready })
    },
    removeTab(id) {
      if (!this.idValid(id))
        return

      delete tabs[id]
    },
    getTab(id) {
      return Object.assign({}, tabs[id])
    },
    setTabReady(id) {
      if (!this.idValid(id))
        return

      tabs[id].ready = true
    },
    toggleActive(id) {
      if (!this.idValid(id))
        return

      tabs[id] = !tabs[id]
    }
  }
}
*/
