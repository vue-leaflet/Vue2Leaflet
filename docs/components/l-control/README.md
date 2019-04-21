# l-control

Add any custom component as a leaflet control

## Playground
Any of the props of `l-control` or the classes that it extends can be used

<vuep template="#control-example"></vuep>


<script v-pre type="text/x-template" id="control-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-control position="bottomleft" >
      <button @click="clickHandler">
        I am a useless button!
      </button>
    </l-control>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-control', Vue2Leaflet.LControl)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482]
    };
  },
  methods: {
    clickHandler () {
      window.alert('and mischievous')
    }
  }
}
</script>
</script>

## Props

`l-control` does not expose any props on his own.

[filename](../props-notice.md ':include')

## Methods

`l-control` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

[filename](../shared-events.md ':include')


## Extends

<!-- tabs:start -->

## ** Control **

[circle.md](../../mixins/control.md ':include')

## ** Options **

[path.md](../../mixins/options.md ':include')

<!-- tabs:end -->
