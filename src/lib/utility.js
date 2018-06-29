export function noop () {}

/**
 * Convert NodeList to array
 *
 * @param {NodeList} nodeList NodeList
 * @return {NodeList[]} array of NodeList
 */
function convertIntoArray (nodeList) {
  return nodeList ? Array.prototype.slice.call(nodeList, 0) : []
}

/**
 * Get elements that can use forEach
 *
 * @param {string|NodeList|Element|Element[]} target - selector or elements
 * @param {Element} context - context element
 * @return {Element[]} array of elements
 */
export function getElements (target, context = document) {
  if (typeof target === 'string') {
    // string
    const nodeList = context.querySelectorAll(target)
    return convertIntoArray(nodeList)
  } else if (target.length) {
    if (target.map) {
      // Array
      return target
    } else {
      // NodeList
      return convertIntoArray(target)
    }
  } else {
    // Element
    return [target]
  }
}
