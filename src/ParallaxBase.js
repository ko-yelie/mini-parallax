import { noop } from './lib/utility'
import getElements from 'get-elements-array'

/**
 * Base function for parallax
 */
export default class ParallaxBase {
  /**
   * @param {string|NodeList|Element|Element[]} target - Target elements (selector or element object)
   * @param {Object} [options={}]
   * @param {onResize} [options.onResize=noop] - Resize event handler
   * @param {onScroll} [options.onScroll=noop] - Scroll event handler
   * @param {boolean} [options.isRound=false] - Whether transform style value is rounded or not
   * @param {boolean} [options.autoRun=true] - Whether to run automatically
   */
  constructor (target, options = {}) {
    const {
      onResize = noop,
      onScroll = noop,
      isRound = false,
      autoRun = true
    } = options

    this._els = getElements(target)
    this._onResize = onResize
    this._onScroll = onScroll
    this._getTransformValueFuncName = `_getTransformValue${isRound ? 'Round' : ''}`
    this._scrollTarget = document.scrollingElement || document.documentElement

    window.addEventListener('resize', () => {
      this._cache()
      this._update()
      this._onResize(this._windowHeight)
    })

    autoRun && this.run()
  }

  /**
   * Run animation
   */
  run () {
    this._cache()
    requestAnimationFrame(() => { this._tick() })
  }

  /**
   * Cache various values
   */
  _cache () {
    this._windowHeight = window.innerHeight
    const scrollY = window.scrollY || window.pageYOffset

    this._items = this._els
      .map(el => {
        el.style.transform = 'none'

        return this._cacheElementPos(el, scrollY)
      })
      .filter(item => item)
  }

  /**
   * Each frame of animation
   */
  _tick () {
    const scrollTop = this._scrollTarget.scrollTop
    if (scrollTop !== this._scrollTop) {
      // When the scroll position changes
      this._scrollTop = scrollTop
      this._update()
    }

    requestAnimationFrame(() => { this._tick() })
  }

  /**
   * Update the position of each element
   */
  _update () {
    this._items.forEach(item => this._updateElement(item))

    this._onScroll(this._scrollTop)
  }

  /**
   * Return the value of transform
   */
  _getTransformValue (position) {
    return `translate3d(0, ${position}px, 0)`
  }

  /**
   * Return the value of transform
   * In order to avoid problems such as bleeding, convert the number to an integers
   */
  _getTransformValueRound (position) {
    return `translate3d(0, ${Math.round(position)}px, 0)`
  }
}

/**
 * @typedef {function} onResize
 * @param {number} windowHeight - `window.innerHeight`
 */

/**
 * @typedef {function} onScroll
 * @param {number} scrollTop - `document.scrollingElement.scrollTop`
 */
