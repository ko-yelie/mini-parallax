import { NormalParallax, BackgroundParallax } from '../src/index.js'

new NormalParallax('.js-parallax')
new NormalParallax('.js-text-parallax', {
  speed: 0.8,
  isRound: true
})
new BackgroundParallax('.js-background-parallax')
