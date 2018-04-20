# mini-parallax
Parallax library

Less Size, Less Functions

## ES Modules

```sh
npm i mini-parallax
```

### [`NormalParallax`](https://ko-yelie.github.io/mini-parallax/class/src/NormalParallax.js~NormalParallax.html)

```js
import { NormalParallax } from 'mini-parallax'

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

### [`BackgroundParallax`](https://ko-yelie.github.io/mini-parallax/class/src/BackgroundParallax.js~BackgroundParallax.html)

Automatically calculate the moving distance from the height of the parent element

```js
import { BackgroundParallax } from 'mini-parallax'

new BackgroundParallax('.js-parallax')
```

```html
<div class="parent">
  <div class="js-parallax"></div>
</div>
```

## CDN

```html
<script src="https://unpkg.com/mini-parallax"></script>
```

`MiniParallax` is global object containing `NormalParallax` and `BackgroundParallax`.

```js
const { NormalParallax } = MiniParallax

new NormalParallax('.js-parallax')
```

---

If you want more features, please consider other parallax libraries.

- [Rellax](https://github.com/dixonandmoe/rellax)
- [Smooth](https://github.com/baptistebriel/smooth-scrolling)
