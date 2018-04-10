import ParallaxBase from './ParallaxBase'

/**
 * 背景画像版パララックス
 *
 * @example
 * new BackgroundParallax('.js-parallax')
 */
export default class BackgroundParallax extends ParallaxBase {
  /**
   * 各要素のポジションをキャッシュする
   */
  cacheElementPos (el, scrollY) {
    const bounding = el.getBoundingClientRect()
    const boundingParent = el.parentNode.getBoundingClientRect()
    const top = boundingParent.top + scrollY
    const inPos = top - this.windowHeight
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
   * 各要素のポジション更新
   */
  updateElement (item) {
    if (this.scrollTop > item.outPos) {
      // アイテムが上の方に見えなくなった後
    } else {
      const diff = this.scrollTop - item.inPos
      if (diff > 0) {
        // アイテムが下から見えた後
        const rate = diff / item.distance
        const position = item.offset + item.max - item.max * rate // 最大値 - (最大値 - 最小値) * rate

        item.el.style.transform = this[this.getTransformValueFuncName](position)
      }
    }
  }
}
