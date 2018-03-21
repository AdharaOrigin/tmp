'use strict'

const messageFactory = {
  create: function create(type, args = []) {
    return Object.assign(Object.create(null), { type, args })
  },
  types: Object.freeze({
    newPageLoading: 'newPageLoading'
    // initRules: 'initRules'
  }),
  getType: function getType(message) {
    return message.type
  },
  getArgs: function getArgs(message) {
    return message.args
  }
}

export default messageFactory
