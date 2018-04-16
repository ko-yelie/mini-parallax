# mini-parallax
Parallax library

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

---

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

---

CDN

```html
<script src="https://unpkg.com/mini-parallax"></script>
```

```js
const { NormalParallax } = MiniParallax

new NormalParallax('.js-parallax')
```
