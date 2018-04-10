import noop from 'noop-es2015'
import getElements from 'get-elements-array'

/**
 * パララックス共通機能
 */
export default class ParallaxBase {
  /**
   * @param {string|NodeList|Element|Element[]} target - パララックス対象要素
   * @param {Object} options
   * @param {function} [options.onResize=noop] - ウィンドウリサイズ時に実行する関数
   * @param {function} [options.onScroll=noop] - スクロール時に実行する関数
   * @param {boolean} [options.isRound=false] - transform の style 値を丸めるかどうか
   * @param {boolean} [options.autoRun=true] - 自動実行するかどうか
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
   * アニメーション開始
   */
  run () {
    this.cache()
    requestAnimationFrame(() => this.tick())
  }

  /**
   * 各種値をキャッシュする
   */
  cache () {
    this.windowHeight = window.innerHeight
    const scrollY = window.scrollY // 現在のスクロール位置

    this.items = this.els
      .map(el => {
        el.style.transform = 'none'

        return this.cacheElementPos(el, scrollY)
      })
      .filter(item => item)

    this.onResize(this.windowHeight)
  }

  /**
   * アニメーションの各フレーム
   */
  tick () {
    const scrollTop = this.scrollTarget.scrollTop
    if (scrollTop !== this.scrollTop) {
      // スクロール位置が変更したとき
      this.scrollTop = scrollTop
      this.update()
    }

    requestAnimationFrame(() => this.tick())
  }

  /**
   * 更新
   */
  update () {
    this.items.forEach(item => this.updateElement(item))

    this.onScroll(this.scrollTop)
  }

  /**
   * transform の style 値を返す
   */
  getTransformValue (position) {
    return `translate3d(0, ${position}px, 0)`
  }

  /**
   * transform の style 値を返す
   * にじみなどの問題を避けるため、座標は整数値に変換する
   */
  getTransformValueRound (position) {
    return `translate3d(0, ${Math.round(position)}px, 0)`
  }
}
