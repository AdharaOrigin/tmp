'use strict'

const xobjMaster = {
  findElement: function findElement(xobj) {
    // todo: implement voting matching
    const htmlElement = document.evaluate(xobj.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue

    return { htmlElement: htmlElement }
  }
}

export default xobjMaster
