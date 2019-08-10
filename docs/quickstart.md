# Quick Start

## Installation

### Npm

``` bash
npm install leaflet vue2-leaflet --save
```

### Yarn

``` bash
yarn add leaflet vue2-leaflet
```

### CDN

```html
<link rel="stylesheet" href="//unpkg.com/leaflet/dist/leaflet.css">
<script src="//unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="//unpkg.com/vue2-leaflet"></script>
```

## Usage

### In a webpack / rollup build system

#### System wide components

```js
import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

```

#### Locally installed components

In your component:

```js
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
    name: 'MyAwesomeMap',
    components: {
        LMap,
        LTileLayer,
        LMarker
    }
}
```

in your entry point: ie: `main.js`

```js
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

```

### If Imported by CDN
When imported by cdn as described above Vue2Leaflet is bound to the window object and components can be used from there:

```js
Vue.component('l-map', window.Vue2Leaflet.LMap)
```

or in a component:

```js
export default {
  components: {
    'l-map': window.Vue2Leaflet.LMap
  }
}
```

### Nuxt

The suggested approach is to use [nuxt-leaflet](https://github.com/schlunsen/nuxt-leaflet)

But it can be manually done by adding a plugin let's say `leaflet.js` in your `plugin` folder

```js
import Vue from 'vue';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
```

And then in your nuxt.config.js edit the plugin array with:

```js
plugins: [
  {src: '~plugins/leaflet.js', ssr: false}
]
```

And then by remembering that `leaflet` cannot be server-side-rendered and so using the `no-ssr` component

```html
<no-ssr>
  <l-map></l-map>
</no-ssr>
```

## Accessing `leaflet` api

Leaflet inner methods and properties can always be accessed by the `mapObject` attribute, to do so a simple ref is necessary:

```html
<template>
  <l-map ref="myMap">
  </l-map>
</template>

<script>
  export default {
    mounted () {
      this.$nextTick(() => {
        this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
      })
    }
  }
</script>
```

!> `mapObject` is not going to be available immediately that is why  `$nextTick` method is used.
