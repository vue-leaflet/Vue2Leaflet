---
sidebar: auto
---

# Quick Start

## Hello, Map!
Vue2Leaflet provides Vue components for <a href="https://leafletjs.com/">Leaflet</a> mapping components
to allow simple construction of declarative maps.
::: demo
<template>
  <l-map style="height: 300px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159]
    };
  }
}
</script>
:::
Here within the Vue template we create an [`<l-map>` component](/components/LMap.html), giving it a
height and binding the `zoom` and `center` properties to define its initial view. Nested inside the
map we add an [`<l-tile-layer>` component](/components/LTileLayer.html) to provide the
[OpenStreetMap](https://www.openstreetmap.org/) base layer and its
[attribution](https://www.openstreetmap.org/copyright), along with an
[`<l-marker>` component](/components/LMarker.html) placed at a bound latitude and longitude.

Continue reading below for more about installing and configuring Vue2Leaflet, check out the
[component documentation](/components) or more detailed [examples](/examples), or view the
list of [community plugins](/plugins) or [FAQ page](/faq).


## Installation

### Npm

```bash
npm install leaflet vue2-leaflet --save
```

### Yarn

```bash
yarn add leaflet vue2-leaflet
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

If the marker icons are missing the issue lies in a problem with webpack, a quick fix is to run this snippet:

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
