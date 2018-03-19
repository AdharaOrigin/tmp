
function getCurrentTabId (executeScript) {
  chrome.tabs.query({ currentWindow: true, highlighted: true }, (tabs) => {
    executeScript(tabs[0].id)
  })
}


RuleManager.getRules(location.href)
  .then((rules) => {
    document.body.innerHTML = JSON.stringify(rules)
    getCurrentTabId((tabid) => {
      // chrome.tabs.executeScript(tabid, { file: 'content.js' })
      console.log(`Tab: ${tabid}`)
    })
  })
  .catch((err) => {
    document.body.innerHTML = 'ERR: ' + JSON.stringify(err)
  })


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
})


const domManipulator = {
  applyTest: () => {
    let xpath1 = '//body/header/div/nav/ul'
    let xpath2 = '//body/header/div/nav/ul/li[1]'
    let list = document.evaluate( xpath1, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue
    let item = document.evaluate( xpath2, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue
    item.remove()
    list.appendChild(item)
  }
}


const XObjMaster = {
  buildXObj: (absXPath) => {
    return { 'xpath': absXPath }
  } ,
  matchXObj: (XObj) => {
    return XObj.xpath
  }
}


// ---- BACKGROUND ----

chrome.tabs.onUpdated.addListener((tabid, changeinfo, tab) => {
  if (changeinfo.status === 'loading') {
    RuleManager.getRules(tab.url)
      .then((rules) => {
        if (Object.keys(rules).length !== 0) {
          alert(JSON.stringify(rules))
        }
      })
  }
})


// ---- MESSAGES ----

const message = {
  types: Object.freeze({
    newPageLoading: 'newPageLoading',
    extensionActive: 'extensionActive'
  }),
  create (type) {
    return Object.assign({}, {
      type: type,
      logType () {
        console.log(this.type)
      }
    })
  }
}

/*
new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
  root: process.cwd()
}),
*/

let msgA = message.create(message.types.newPageLoading)
let msgB = message.create(message.types.newPageLoading)
console.log(msgA)
console.log(msgB)
console.log('------------------------------------------------------------')
console.log(msgA.prototype)

let ms = Object.create(message)
console.log(ms.prototype)


const message = function () {
  create: function create (type) {
    let newMessage = Object.create(this)
    newMessage.type = type

    newMessage.is

    return newMessage
  },

  is: function is (expectedType) {
    return this.type === expectedType
  },

  types: {
    newPageLoading: 'newPageLoading'
  }
}

// export {message}


const utils = {
  parseUrl: function parseUrl(url) {
    const parts = url.replace('///', '//').split('//')
    let parsedUrl

    parts.length > 1 ? [, parsedUrl] = parts : [parsedUrl] = parts
    if (parsedUrl.startsWith('www.')) {
      parsedUrl = parsedUrl.replace('www.', '')
    }
    [parsedUrl] = parsedUrl.split('?')
    if (parsedUrl[parsedUrl.length - 1] === '/') {
      parsedUrl = parsedUrl.slice(0, -1)
    }

    return {
      domain: parsedUrl.split('/')[0],
      page: parsedUrl
    }
  }
}

export default utils
