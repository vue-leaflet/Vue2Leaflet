---
sidebar: auto
---

# Quick Start

## Installation

### Npm

```bash
npm install leaflet vue2-leaflet --save
```

### Yarn

```bash
yarn add leaflet vue2-leaflet
```
### Add leaflet css in your index.html file

```html
<link rel="stylesheet" href="//unpkg.com/leaflet/dist/leaflet.css" />
```

### CDN

```html
<link rel="stylesheet" href="//unpkg.com/leaflet/dist/leaflet.css" />
<script src="//unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="//unpkg.com/vue2-leaflet"></script>
```

## Usage

### In a webpack / rollup build system

#### System wide components

```js
import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
```

#### Locally installed components

##### In your component:

```js
// If you need to reference 'L', such as in 'L.icon', then be sure to
// explicitly import 'leaflet' into your component
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'MyAwesomeMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
};
```

##### In your entry point: ie: `main.js`

```js
import 'leaflet/dist/leaflet.css';
```

### If Imported by CDN

When imported by cdn as described above Vue2Leaflet is bound to the window object and components can be used from there:

```js
Vue.component('l-map', window.Vue2Leaflet.LMap);
```

or in a component:

```js
export default {
  components: {
    'l-map': window.Vue2Leaflet.LMap,
  },
};
```

### Nuxt

The suggested approach is to use [nuxt-leaflet](https://github.com/schlunsen/nuxt-leaflet)

But it can be manually done by adding a plugin let's say `leaflet.js` in your `plugin` folder

```js
import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
```

And then in your nuxt.config.js edit the plugin array with:

```js
plugins: [{ src: '~plugins/leaflet.js', ssr: false }];
```

And then by remembering that `leaflet` cannot be server-side-rendered and so using the `client-only` component

```html
<client-only>
  <l-map></l-map>
</client-only>
```

## Marker Icons are missing

If the maker icons are missing the issue lies in a problem with webpack, a quick fix is to run this snippet:

```javascript
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
```

For TypeScript, you will need to define `_getIconUrl` by hand as it is a private property:

```ts
type D = Icon.Default & {
  _getIconUrl?: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;
```

## Accessing `leaflet` api

Leaflet inner methods and properties can always be accessed by the `mapObject` attribute, to do so a simple ref is necessary:

```html
<template>
  <l-map ref="myMap"> </l-map>
</template>

<script>
  export default {
    mounted() {
      this.$nextTick(() => {
        this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
      });
    },
  };
</script>
```

::: tip
`mapObject` is not going to be available immediately that is why `$nextTick` method is used.
:::


**Note:** You can also use [l-map](/components/LMap.md) component `ready` event to ensure that you access `mapObject` after it's loaded:

```html
<l-map ref="myMap" @ready="doSomethingOnReady()"></l-map>
```
```javascript
methods: {
    doSomethingOnReady() {
        this.map = this.$refs.myMap.mapObject
    },
},
```
