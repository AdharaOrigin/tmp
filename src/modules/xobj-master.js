'use strict'

const ObjectMaster = {
  findElement: function findElement(object) {
    // todo: implement voting matching
    return document.evaluate(object.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  }
}

export default ObjectMaster
