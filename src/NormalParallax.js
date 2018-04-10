import noop from 'noop-es2015'
import ParallaxBase from './ParallaxBase'

/**
 * パララックス
 *
 * @example
 * new NormalParallax('.js-parallax', {
 *   speed: 0.03
 * })
 */
export default class NormalParallax extends ParallaxBase {
  /**
   * @param {string|NodeList|Element|Element[]} target - パララックス対象要素
   * @param {Object} options
   * @param {function} [options.onResize=noop] - ウィンドウリサイズ時に実行する関数
   * @param {function} [options.onScroll=noop] - スクロール時に実行する関数
   * @param {boolean} [options.isRound=false] - transform の style 値を丸めるかどうか
   * @param {boolean} [options.autoRun=true] - 自動実行するかどうか
   * @param {number} [options.speed=0.1] - 移動スピード（-∞ 〜 ∞）
   * @param {number} [options.speedSp=options.speed] - SP 表示での移動スピード（デフォルトは PC と同じ）
   * @param {function} [options.isSP=noop] - SP表示かどうかを判別する関数
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

    this.speedPc = speed
    this.speedSp = speedSp
    this.isSP = isSP

    autoRun && this.run()
  }

  /**
   * 各種値をキャッシュする
   */
  cache () {
    this.isSpCurrent = this.isSP()
    this.speed = this.isSpCurrent ? this.speedSp : this.speedPc
    this.speed *= window.innerWidth / window.innerHeight

    super.cache()
  }

  /**
   * 各要素のポジションをキャッシュする
   */
  cacheElementPos (el, scrollY) {
    // SP 無効指定ならパララックスさせない
    if (this.isSpCurrent && el.dataset.sp === 'false') return

    const bounding = el.getBoundingClientRect()
    const top = bounding.top + scrollY

    return {
      el,
      top,
      center: top + bounding.height / 2,
      speed: parseFloat(el.dataset.speed, 10) || this.speed,
      inPos: top - this.windowHeight,
      outPos: bounding.bottom + scrollY
    }
  }

  /**
   * 各要素のポジション更新
   */
  updateElement (item) {
    if (this.scrollTop > item.outPos) {
      // アイテムが上の方に見えなくなった後
    } else if (this.scrollTop > item.inPos) {
      // アイテムが下から見えた後
      const position =
        (item.center - (this.scrollTop + this.windowHeight / 2)) * item.speed
      item.el.style.transform = this[this.getTransformValueFuncName](position)
    }
  }
}
