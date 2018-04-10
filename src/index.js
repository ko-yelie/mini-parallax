import NormalParallax from './NormalParallax'
import BackgroundParallax from './BackgroundParallax'

/**
 * パララックス
 *
 * @example
 * new MiniParallax('.js-parallax', {
 *   speed: 0.03
 * })
 *
 * @example
 * // 背景画像版
 * new MiniParallax('.js-parallax', {
 *   isBackground: true
 * })
 */
export default class MiniParallax {
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
   * @param {boolean} [options.isBackground=false] - 背景画像版かどうか
   */
  constructor (target, options = {}) {
    const ParallaxClass = options.isBackground ? BackgroundParallax : NormalParallax
    return new ParallaxClass(target, options)
  }
}
