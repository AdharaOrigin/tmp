'use strict'

import XObjMaster from './xobj-master'
import { passRule } from '../content'


const domProbe = {
  newRuleType: undefined,
  targetElement: {
    element: undefined,
    xpath: undefined,

    assign: function assign(elem) {
      this.removeOutline()
      this.xpath = XObjMaster.getXPathTo(elem)
      this.element = XObjMaster.getElementNode(this.xpath)
      console.log(this.xpath)
      console.log(this.element)
      this.drawOutline()
    },

    drawOutline: function addOutline() {
      if (this.element !== undefined) {
        // this.origOutline = this.element.style.outline
        // this.element.style.outline = '1px solid black'
        let domRect = this.element.getBoundingClientRect();
        this.overlay.style.width = domRect.width + 'px'
        this.overlay.style.height = domRect.height + 'px'
        this.overlay.style.top = domRect.top + 'px'
        this.overlay.style.left = domRect.left + 'px'
      }
    },
    removeOutline: function removeOutline() {
      // if (this.element !== undefined)
      //   this.element.style.outline = this.origOutline
      this.overlay.style.width = '0px'
      this.overlay.style.height = '0px'
      this.overlay.style.top = '0px'
      this.overlay.style.left = '0px'
    },

    expandSelection: function expandSelection() {
      if (this.element.parentNode !== undefined && this.element.parentNode.tagName !== 'BODY')
        this.assign(this.element.parentNode)
    },
    shrinkSelection: function shrinkSelection() {
      if (this.element.firstElementChild !== null)
        this.assign(this.element.firstElementChild)
    }
  },
  origEventActions: {},

  startProbing: function startProbing(ruleType) {
    this.newRuleType = ruleType
    this.saveOrigActions()
    this.setSelectMode()

    this.targetElement.overlay = document.createElement('div')
    this.targetElement.overlay.id = 'purify-overlay'
    this.targetElement.overlay.style.position = 'absolute'
    this.targetElement.overlay.style.backgroundColor = 'rgba(150, 0, 0, .5)'
    this.targetElement.overlay.style.border = '1px solid rgba(255, 255, 255, .5)'
    this.targetElement.overlay.style.pointerEvents = 'none'
    document.body.appendChild(this.targetElement.overlay)
    document.body.style.cursor = 'pointer'
  },

  setSelectMode: function setSelectState() {
    document.onclick = (event) => {
      event.stopPropagation()
      event.preventDefault()
    }
    this.cancelProbeByEsc()
    this.saveHoveredElement()
    this.clickSetsAdjustMode()
    this.showSelectionMenu()
  },

  setAdjustMode: function setAdjustState() {
    document.onmouseover = this.origEventActions.mouseOver
    document.onmouseup = this.origEventActions.mouseUp
    document.onclick = this.origEventActions.mouseClick
    document.body.style.cursor = 'auto'
    this.expandSelectionMenu()
    // this.clickSetsSelectMode()
  },

  stopProbing: function setDefaultState() {
    document.onkeydown = this.origEventActions.keyDown
    document.onmouseover = this.origEventActions.mouseOver
    document.onmouseup = this.origEventActions.mouseUp
    document.onclick = this.origEventActions.mouseClick
    document.body.style.cursor = 'auto'
    this.targetElement.removeOutline()
    this.removeSelectionMenu()
  },

  saveOrigActions: function saveOrigActions() {
    this.origEventActions.keyDown = document.onkeydown
    this.origEventActions.mouseOver = document.onmouseover
    this.origEventActions.mouseUp = document.onmouseup
    this.origEventActions.mouseClick = document.onclick
  },

  cancelProbeByEsc: function listenToEscape() {
    document.onkeydown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.stopProbing()
      }
    }
  },

  saveHoveredElement: function catchMouseTarget() {
    document.onmouseover = (event) => {
      this.targetElement.assign(event.target)
    }
  },

  clickSetsAdjustMode: function catchMouseClick() {
    document.onmouseup = (event) => {
      event.preventDefault()
      event.stopPropagation()
      this.setAdjustMode()
    }
  },

  clickSetsSelectMode: function clickSetsAdjustMode() {
    document.onmouseup = (event) => {
      event.stopPropagation()
      event.preventDefault()
      this.setSelectMode()
    }
  },


  showSelectionMenu: function showSelectionMenu() {
    this.selectionMenu = document.createElement('div')
    this.selectionMenu.innerHTML = '<h5>Select element</h5>'
    this.selectionMenu.id = 'sniffmenu'

    document.body.appendChild(this.selectionMenu)
  },

  expandSelectionMenu: function expandSelectionMenu() {
    this.selectionMenu.innerHTML += '<input type="text" id="rule-name">'
    this.selectionMenu.innerHTML += 'Keep space: <input type="checkbox" id="keep-space">'
    this.selectionMenu.innerHTML += '<br>'
    this.selectionMenu.innerHTML += '<button id="expsel"> + </button>'
    this.selectionMenu.innerHTML += '<button id="shrsel"> - </button>'
    this.selectionMenu.innerHTML += '<br>'
    this.selectionMenu.innerHTML += '<button id="save-btn">Save</button>'

    document.getElementById('expsel').addEventListener('click', () => {
      this.targetElement.expandSelection()
    })

    document.getElementById('shrsel').addEventListener('click', () => {
      this.targetElement.shrinkSelection()
    })

    document.getElementById('save-btn').addEventListener('click', () => {
      let name = document.getElementById('rule-name').value
      let operation = (document.getElementById('keep-space').checked) ? 'Hide' : 'Delete'
      this.saveRule(name, operation)
    })

    this.selectionMenu.style.height = '160px'
    this.cancelProbeByEsc(false)
  },

  removeSelectionMenu: function removeSelectionMenu() {
    this.selectionMenu.parentNode.removeChild(this.selectionMenu);
  },

  saveRule: function saveRule(name, operation) {
    let rule = {
      'name': name,
      'operation': operation,
      'obj': { 'xpath': this.targetElement.xpath }
    }
    this.stopProbing()
    passRule(this.newRuleType, rule)
  }
}


export default domProbe
