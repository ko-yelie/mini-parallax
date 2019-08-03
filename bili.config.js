module.exports = {
  babel: {
    minimal: true
  },
  banner: require('banner-package'),
  output: {
    moduleName: 'MiniParallax',
    format: ['es', 'iife', 'iife-min'],
    sourceMap: false
  }
}
