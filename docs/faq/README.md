# FAQ

## My map and/or markers don't fully render. What gives?

Depending on your project setup, you may have to try different solutions.

To fix map rendering issues, it may help to [import the Leaflet stylesheet within the **script** section of your Vue component](https://github.com/KoRiGaN/Vue2Leaflet/issues/157#issuecomment-384307765).

In most cases, though, it is Webpack messing with Leaflet marker icons' paths, resulting in warnings or even errors. You can alleviate that by either [unsetting/replacing the default paths](https://github.com/KoRiGaN/Vue2Leaflet/issues/96#issuecomment-341453050) ([alternate solution](https://github.com/Leaflet/Leaflet/issues/4968#issuecomment-319569682)) or [using Webpack aliases](https://github.com/Leaflet/Leaflet/issues/4849#issuecomment-307436996).

## How can I access the Leaflet map object?

First add a ref to the map

``` html
  <l-map ref="map" :zoom=13 :center="[47.413220, -1.219482]">
    ...
  </l-map>
```

Then in you JavaScript you can use mapObject which is Leaflet map instance :

``` javascript
this.$refs.map.mapObject;
```

**Note:** `mapObject` is not available directly in vue's `mounted` hook. You need to wrap the call to `this.$refs.map` in a `nextTick` call:

``` javascript
data: () => ({map: null}),
mounted () {
  // DON'T
  this.map = this.$refs.map.mapObject // doesn't work, this.map is null

  // DO
  this.$nextTick(() => {
    this.map = this.$refs.map.mapObject // work as expected
  })
},
```

This also work for any other component (Marker, Polyline, etc...)

## How can I bind events of Vue2Leaflet components?

All event binding can be done to event with the same name as in [leaflet documentation](http://leafletjs.com/reference-1.3.0.html).

For example if you want to listen to Vue2Leaflet.LMarker move event.

``` html
<l-marker :lat-lng="[47.413220, -1.219482]" @move="doSomething"></l-marker>
```

## Why am I getting weird errors for things that work fine in the demos?

There may be an issue with mismatching Leaflet versions ([see issue #281](https://github.com/KoRiGaN/Vue2Leaflet/issues/281)) that, depending on the setup you have, could be causing problems. If you're using Nuxt.js, modify `nuxt.config.js` to include an alias for Leaflet in the webpack config.

``` javascript
const path = require('path')

module.exports = {
  // other config properties go here...
  build: {
    extend(config, ctx) {
      config.resolve.alias['leaflet'] = path.join(__dirname, 'node_modules/leaflet')
    }
  }
}
```
