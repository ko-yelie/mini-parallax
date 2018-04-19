import noop from 'noop-es2015'
import getElements from 'get-elements-array'

/**
 * Common function for parallax
 */
export default class ParallaxBase {
  /**
   * @param {string|NodeList|Element|Element[]} target - Target elements (selector or element object)
   * @param {Object} options
   * @param {function} [options.onResize=noop] - Resize event handler
   * @param {function} [options.onScroll=noop] - Scroll event handler
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

    this.els = getElements(target)
    this.onResize = onResize
    this.onScroll = onScroll
    this.getTransformValueFuncName = `getTransformValue${isRound ? 'Round' : ''}`
    this.scrollTarget = document.scrollingElement || document.documentElement

    window.addEventListener('resize', () => this.cache())

    autoRun && this.run()
  }

  /**
   * Run animation
   */
  run () {
    this.cache()
    requestAnimationFrame(() => this.tick())
  }

  /**
   * Cache various values
   */
  cache () {
    this.windowHeight = window.innerHeight
    const scrollY = window.scrollY

    this.items = this.els
      .map(el => {
        el.style.transform = 'none'

        return this.cacheElementPos(el, scrollY)
      })
      .filter(item => item)

    this.onResize(this.windowHeight)
  }

  /**
   * Each frame of animation
   */
  tick () {
    const scrollTop = this.scrollTarget.scrollTop
    if (scrollTop !== this.scrollTop) {
      // When the scroll position changes
      this.scrollTop = scrollTop
      this.update()
    }

    requestAnimationFrame(() => this.tick())
  }

  /**
   * Update the position of each element
   */
  update () {
    this.items.forEach(item => this.updateElement(item))

    this.onScroll(this.scrollTop)
  }

  /**
   * Return the value of transform
   */
  getTransformValue (position) {
    return `translate3d(0, ${position}px, 0)`
  }

  /**
   * Return the value of transform
   * In order to avoid problems such as bleeding, convert the number to an integers
   */
  getTransformValueRound (position) {
    return `translate3d(0, ${Math.round(position)}px, 0)`
  }
}
