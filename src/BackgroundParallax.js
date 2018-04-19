import ParallaxBase from './ParallaxBase'

/**
 * Automatically calculate the moving distance from the height of the parent element
 *
 * @example
 * new BackgroundParallax('.js-parallax')
 */
export default class BackgroundParallax extends ParallaxBase {
  /**
   * @param {string|NodeList|Element|Element[]} target - Target elements (selector or element object)
   * @param {Object} options
   * @param {function} [options.onResize=noop] - Resize event handler
   * @param {function} [options.onScroll=noop] - Scroll event handler
   * @param {boolean} [options.isRound=false] - Whether transform style value is rounded or not
   * @param {boolean} [options.autoRun=true] - Whether to run automatically
   */
  constructor (target, options) {
    super(target, options)
  }

  /**
   * Cache various values of one element
   */
  _cacheElementPos (el, scrollY) {
    const bounding = el.getBoundingClientRect()
    const boundingParent = el.parentNode.getBoundingClientRect()
    const top = boundingParent.top + scrollY
    const inPos = top - this._windowHeight
    const outPos = boundingParent.bottom + scrollY

    return {
      el,
      max: boundingParent.height - bounding.height,
      inPos,
      outPos,
      distance: outPos - inPos,
      offset: boundingParent.top - bounding.top
    }
  }

  /**
   * Update the position of one element
   */
  _updateElement (item) {
    if (this._scrollTop > item.outPos) {
      // After the element disappears in the upper direction
    } else {
      const diff = this._scrollTop - item.inPos
      if (diff > 0) {
        // After the element can be seen from below
        const rate = diff / item.distance
        const position = item.offset + item.max - item.max * rate // max - (max - min) * rate

        item.el.style.transform = this[this._getTransformValueFuncName](position)
      }
    }
  }
}
