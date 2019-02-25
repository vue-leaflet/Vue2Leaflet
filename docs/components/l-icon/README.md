# l-icon

Easy and reactive way to configure the icon of a marker


## Playground
Any of the props of `l-icon` or the classes that it extends can be used

<vuep template="#control-zoom-example"></vuep>

<script v-pre type="text/x-template" id="control-zoom-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="[47.413220, -1.219482]" > </l-marker>
      <l-marker
        :lat-lng="[47.413220, -1.209482]"
        :icon="icon" > </l-marker>
      <l-marker :lat-lng="[47.413220, -1.199482]">
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          icon-url="static/images/baseball-marker.png" >
        </l-icon>
      </l-marker>
      <l-marker :lat-lng="[47.413220, -1.189482]">
        <l-icon
          :icon-anchor="staticAnchor"
          class-name="someExtraClass">
          <div class="headline">{{ customText }}</div>
          <img src="static/images/layers.png">
        </l-icon>
      </l-marker>
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-icon', Vue2Leaflet.LIcon)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.413220, -1.219482],
      icon: L.icon({
        iconUrl: 'static/images/baseball-marker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 64
    };
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  }
}
</script>
</script>

## Props

```js
{
   iconUrl: {
      type: String,
      custom: true,
      default: null
    },
    iconRetinaUrl: {
      type: String,
      custom: true,
      default: null
    },
    iconSize: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    iconAnchor: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    popupAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    tooltipAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    shadowUrl: {
      type: String,
      custom: true,
      default: null
    },
    shadowRetinaUrl: {
      type: String,
      custom: true,
      default: null
    },
    shadowSize: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    shadowAnchor: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    bgPos: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    className: {
      type: String,
      custom: true,
      default: ''
    },
    options: {
      type: Object,
      custom: true,
      default: () => ({})
    }
}
```

[filename](../props-notice.md ':include')

## Methods

`l-icon` does not expose any public method on his own.

[filename](../methods-notice.md ':include')

## Events

`l-icon` does not emit any event on his own.

[filename](../events-notice.md ':include')
