'use strict'

const domProbe = {
  selectionMenu: undefined,
  lastSelected: undefined,
  originalEventActions: {},

  startProbing: function startElemSelection() {
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
        let elem = event.target
        event.stopPropagation()
        event.preventDefault()

        this.drawBorders(false)
        this.catchMouseClick(false)
        this.expandSelectionMenu(elem.tagName)
      }
    } else {
      document.onmouseup = this.originalEventActions.mouseUp
    }
  },

  expandSelectionMenu: function expandSelectionMenu(elemType) {
    this.selectionMenu.innerHTML += '<h5>Selected: ' + elemType + '</h5>'
    this.selectionMenu.innerHTML += '<button id="save-btn">Save</button>'
    this.selectionMenu.style.height = '80px'
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
  }
}

// chrome.runtime.sendMessage(this.rules)


export default domProbe
