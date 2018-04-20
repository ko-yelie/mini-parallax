import noop from 'noop-es2015'
import ParallaxBase from './ParallaxBase'

/**
 * Parallax library
 *
 * @example
 * new NormalParallax('.js-parallax', {
 *   speed: 0.03
 * })
 */
export default class NormalParallax extends ParallaxBase {
  /**
   * @param {string|NodeList|Element|Element[]} target - Target elements (selector or element object)
   * @param {Object} [options={}]
   * @param {onResize} [options.onResize=noop] - Resize event handler
   * @param {onScroll} [options.onScroll=noop] - Scroll event handler
   * @param {boolean} [options.isRound=false] - Whether transform style value is rounded or not
   * @param {boolean} [options.autoRun=true] - Whether to run automatically
   * @param {number} [options.speed=0.1] - Moving speed (-Infinity to Infinity)
   * @param {number} [options.speedSp=options.speed] - Moving speed in SP display (default is same as PC)
   * @param {function} [options.isSP=noop] - Function to determine whether SP display or not
   */
  constructor (target, options = {}) {
    const {
      speed = 0.1,
      speedSp = speed,
      isSP = noop,
      autoRun = true
    } = options

    options.autoRun = false
    super(target, options)

    this._speedPc = speed
    this._speedSp = speedSp
    this._isSP = isSP

    autoRun && this.run()
  }

  /**
   * Cache various values
   */
  _cache () {
    this._isSpCurrent = this._isSP()
    this._speed = this._isSpCurrent ? this._speedSp : this._speedPc
    this._speed *= window.innerWidth / window.innerHeight

    super._cache()
  }

  /**
   * Cache various values of one element
   */
  _cacheElementPos (el, scrollY) {
    // Do not parallax if it is specified to invalidate by SP
    if (this._isSpCurrent && el.dataset.sp === 'false') return

    const bounding = el.getBoundingClientRect()
    const top = bounding.top + scrollY

    return {
      el,
      top,
      center: top + bounding.height / 2,
      speed: parseFloat(el.dataset.speed, 10) || this._speed,
      inPos: top - this._windowHeight,
      outPos: bounding.bottom + scrollY
    }
  }

  /**
   * Update the position of each element
   */
  _update () {
    this._centerViewport = this._scrollTop + this._windowHeight / 2

    super._update()
  }

  /**
   * Update the position of one element
   */
  _updateElement (item) {
    if (this._scrollTop > item.outPos) {
      // After the element disappears in the upper direction
    } else if (this._scrollTop > item.inPos) {
      // After the element can be seen from below
      const position =
        (item.center - this._centerViewport) * item.speed
      item.el.style.transform = this[this._getTransformValueFuncName](position)
    }
  }
}
