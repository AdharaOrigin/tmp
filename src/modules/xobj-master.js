'use strict'

const ObjectMaster = {
  findElement: function findElement(object) {
    // todo: implement voting matching
    return document.evaluate(object.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  },

  getElementNode: function getXpath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  },

  getXPathTo: function getXPathTo(element) {
    if (element.id!=='') {
      return 'id("'+element.id+'")';
    }

    if (element===document.body) {
      return element.tagName;
    }

    let ix= 0;
    let siblings= element.parentNode.childNodes;
    for (let i= 0; i<siblings.length; i++) {
      let sibling = siblings[i];
      if (sibling === element) {
        return getXPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix+1) + ']';
      }
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
  }

}

export default ObjectMaster
