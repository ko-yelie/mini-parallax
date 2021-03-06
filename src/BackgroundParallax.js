import { noop, getElements } from './modules/utility'

/**
 * Automatically calculate the moving distance from the height of the parent element
 */
export default class BackgroundParallax {
  /**
   * @param {string|NodeList|Element|Element[]} target - Target elements (selector or element object)
   * @param {Object} [options={}]
   * @param {onResize} [options.onResize=noop] - Resize event handler
   * @param {onScroll} [options.onScroll=noop] - Scroll event handler
   * @param {boolean} [options.isRound=false] - Whether transform style value is rounded or not
   * @param {boolean} [options.autoRun=true] - Whether to run automatically
   */
  constructor (target, options = {}) {
    this._els = getElements(target)
    if (this._els.length === 0) {
      this._disabled = true
      return
    }

    const {
      onResize = noop,
      onScroll = noop,
      isRound = false,
      autoRun = true
    } = options

    this._optionOnResize = onResize
    this._optionOnScroll = onScroll
    this._fTansform = `_getTransform${isRound ? 'Round' : ''}`
    this._scrollTarget = document.scrollingElement || document.documentElement

    this._onResize = () => {
      this.update()
      this._optionOnResize(this._windowHeight)
    }
    window.addEventListener('resize', this._onResize)

    this._onLoad = () => {
      this.update()
    }
    window.addEventListener('load', this._onLoad)

    autoRun && this.run()
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
        const willChange = window.getComputedStyle(el).willChange
        el.style.willChange = 'transform'
        if (!(willChange === 'auto' || willChange === 'transform')) el.style.willChange += ', ' + willChange

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

    this._animationFrameId = requestAnimationFrame(() => { this._tick() })
  }

  /**
   * Update the position of each element
   */
  _update () {
    this._items.forEach(item => this._updateElement(item))

    this._optionOnScroll(this._scrollTop)
  }

  /**
   * Return the value of transform
   */
  _getTransform (position) {
    return `translate3d(0, ${position}px, 0)`
  }

  /**
   * Return the value of transform
   * In order to avoid problems such as bleeding, convert the number to an integers
   */
  _getTransformRound (position) {
    return `translate3d(0, ${Math.round(position)}px, 0)`
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

        item.el.style.transform = this[this._fTansform](position)
      }
    }
  }

  /**
   * Run animation
   */
  run () {
    if (this._disabled) return

    this._cache()
    this._animationFrameId = requestAnimationFrame(() => { this._tick() })
  }

  /**
   * Update cache and position
   */
  update () {
    if (this._disabled) return

    this._cache()
    this._update()
  }

  /**
   * Destroy instance
   */
  destroy () {
    if (!this._els) return

    cancelAnimationFrame(this._animationFrameId)

    this._els.forEach(el => {
      el.style.transform = null
      el.style.willChange = null
    })

    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('load', this._onLoad)
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
