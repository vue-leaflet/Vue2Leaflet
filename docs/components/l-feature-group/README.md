# l-feature-group

Group together elements of the maps  including: markers, geoJSON, polylines and polygon, tooltip and popup.

!> This is particularly useful to have a single tooltip / popup that is 'shared' across multiple markers

## Playground
Any of the props of `l-feature-group` or the classes that it extends can be used

<vuep template="#control-zoom-example"></vuep>

<script v-pre type="text/x-template" id="control-zoom-example">

<template>
  <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-feature-group ref="features">
      <l-popup > <span> Yay I was opened by {{caller}}</span></l-popup>
    </l-feature-group>
    <l-marker :lat-lng="markerLatLng" @click="openPopUp(markerLatLng, 'marker')"></l-marker>
    <l-circle
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
      @click="openPopUp(circle.center, 'circle')"
    />
  </l-map>
</template>

<script>

Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-feature-group', Vue2Leaflet.LFeatureGroup)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-popup', Vue2Leaflet.LPopup)
Vue.component('l-circle', Vue2Leaflet.LCircle)

export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      markerLatLng: [47.313220, -1.319482],
      caller: null,
      circle: {
        center: [47.413220, -1.0482],
        radius: 4500,
        color: 'red'
      }
    };
  },
  methods: {
    openPopUp (latLng, caller) {
      this.caller = caller;
      this.$refs.features.mapObject.openPopup(latLng);
    }
  }
}
</script>
</script>

## Props

`l-feature-group` does not expose any public props on his own, see inherited ones.

## Methods

`l-feature-group` does not expose any public method on his own, see inherited ones.

## Extends

<!-- tabs:start -->

## ** LayerGroup **

[circle.md](../../mixins/layer-group.md ':include')

## ** Layer **

[path.md](../../mixins/layer.md ':include')

<!-- tabs:end -->