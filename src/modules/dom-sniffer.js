'use strict'

import XObjMaster from './xobj-master'
import { passRule } from '../content'


const domProbe = {
  selectionMenu: undefined,
  lastSelected: undefined,
  selected: { 'node': undefined, 'xpath': '' },
  originalEventActions: {},
  newRuleType: undefined,

  startProbing: function startProbing(ruleType) {
    this.newRuleType = ruleType
    this.saveOriginalActions()
    this.showSelectionMenu()
    this.redirectEvents(true)
  },

  saveOriginalActions: function saveOriginalActions() {
    this.originalEventActions.keyDown = document.onkeydown
    this.originalEventActions.mouseOver = document.onmouseover
    this.originalEventActions.mouseOut = document.onmouseout
    this.originalEventActions.mouseUp = document.onmouseup
    this.originalEventActions.mouseClick = document.onclick
  },

  showSelectionMenu: function showSelectionMenu() {
    this.selectionMenu = document.createElement('div')
    this.selectionMenu.innerHTML = '<h5>Select element</h5>'
    this.selectionMenu.id = 'sniffmenu'

    document.body.appendChild(this.selectionMenu)
  },

  redirectEvents: function redirectEvents(active) {
    this.drawBorders(active)
    this.catchMouseClick(active)
    this.listenToEscapeKey(active)
  },

  drawBorders: function drawBorders(active) {
    if (active) {
      document.onmouseover = (event) => {
        let elem = event.target
        elem.originalOutline = elem.style.outline
        elem.style.outline = '1px solid black'
        this.lastSelected = elem
      }
      document.onmouseout = (event) => {
        let elem = event.target
        elem.style.outline = elem.originalOutline
      }
    } else {
      document.onmouseover = this.originalEventActions.mouseOver
      document.onmouseout = this.originalEventActions.mouseOut
    }
  },

  catchMouseClick: function catchMouseClick(active) {
    if (active) {
      document.onclick = (event) => {
        event.stopPropagation()
        event.preventDefault()
      }
      document.onmouseup = (event) => {
        event.stopPropagation()
        event.preventDefault()

        let target = event.target
        this.selected.xpath = 'HTML/' + XObjMaster.getXPathTo(target)
        this.selected.node  = XObjMaster.getElementNode(this.selected.xpath)

        this.drawBorders(false)
        this.catchMouseClick(false)
        this.expandSelectionMenu()
      }
    } else {
      document.onclick = this.originalEventActions.mouseClick
      document.onmouseup = this.originalEventActions.mouseUp
    }
  },

  expandSelectionMenu: function expandSelectionMenu() {
    this.selectionMenu.innerHTML += '<input type="text" id="rule-name">'
    this.selectionMenu.innerHTML += 'Keep space: <input type="checkbox" checked="false" id="keep-space">'
    document.getElementById('keep-space').addEventListener('click', () => {
      document.getElementById('rule-name').checked = !document.getElementById('rule-name').checked
    })

    this.selectionMenu.innerHTML += '<br><button id="expand-selection"> + </button>'
    this.selectionMenu.innerHTML += '<button id="expand-selection"> - </button><br>'

    this.selectionMenu.innerHTML += '<button id="save-btn">Save</button>'
    document.getElementById('save-btn').addEventListener('click', () => {
      let name = document.getElementById('rule-name').value
      let operation = (document.getElementById('keep-space').checked) ? 'Hide' : 'Delete'
      this.saveRule(name, operation)
    })

    this.selectionMenu.style.height = '160px'
    this.listenToEscapeKey(false)
  },

  listenToEscapeKey: function listenToEscape(active) {
    if (active) {
      document.onkeydown = (event) => {
        if (event.key !== 'F5') {
          event.stopPropagation()
          event.preventDefault()
        }
        if (event.key === 'Escape' || event.key === 'Esc') {
          document.onclick = this.originalEventActions.mouseClick
          this.removeSelectionMenu()
        }
      }
    } else {
      document.onkeydown = this.originalEventActions.keyDown
    }
  },

  removeSelectionMenu: function removeSelectionMenu() {
    this.selectionMenu.parentNode.removeChild(this.selectionMenu);
    this.redirectEvents(false)
    if (this.lastSelected !== undefined) {
      this.lastSelected.style.outline = this.lastSelected.originalOutline
    }
  },

  saveRule: function saveRule(name, operation) {
    let rule = {
      'name': name,
      'operation': operation,
      'obj': { 'xpath': this.selected.xpath }
    }
    console.log(rule)
    passRule(this.newRuleType, rule)
    this.removeSelectionMenu()
  }
}


export default domProbe
