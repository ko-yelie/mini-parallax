# mini-parallax
Parallax library contains both normal parallax and background parallax.

Written in vanilla JavaScript. It's lightweight.

## Demo

- [GitHub Pages](https://ko-yelie.github.io/mini-parallax/)
- [CodePen](https://codepen.io/ko-yelie/pen/vjaLRg)

## Installation

### ES Modules

[npm](https://www.npmjs.com/package/mini-parallax)

```sh
npm i mini-parallax
```

```js
import { NormalParallax, BackgroundParallax } from 'mini-parallax'
```

### CDN

[unpkg](https://unpkg.com/mini-parallax)

```html
<script src="https://unpkg.com/mini-parallax"></script>
```

```js
const { NormalParallax, BackgroundParallax } = MiniParallax
```

`MiniParallax` is global object containing `NormalParallax` and `BackgroundParallax` class.

## Usage

### `NormalParallax` class

[Docs](https://ko-yelie.github.io/mini-parallax/docs/class/src/NormalParallax.js~NormalParallax.html)

```js
new NormalParallax('.js-parallax', {
  speed: 0.03
})
```

```html
<div class="js-parallax"></div>

<!-- Set speed only for this element -->
<div class="js-parallax" data-speed="0.05"></div>
```

If you disable `autoRun`, run it at any time you like.

```js
const parallax = new NormalParallax('.js-parallax', {
  autoRun: false
})

window.addEventListener('load', () => {
  parallax.run()
})
```

If the text is in the parallax element, it will blur, so set the `isRound` option to `true`.

```js
new NormalParallax('.js-parallax', {
  isRound: true
})
```

### `BackgroundParallax` class

It automatically calculates the position of the background element from the height of the parent element and the background element.

[Docs](https://ko-yelie.github.io/mini-parallax/docs/class/src/BackgroundParallax.js~BackgroundParallax.html)

```js
new BackgroundParallax('.js-background-parallax')
```

```html
<div class="parent">
  <div class="js-background-parallax"></div>
</div>
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last version| last version| last version| last version

---

If you want more features, please consider other parallax libraries.

- [Rellax](https://github.com/dixonandmoe/rellax)
- [smooth](https://github.com/baptistebriel/smooth-scrolling)
