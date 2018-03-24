<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Custom path</h3>
        Marker icon are retrived from {{ path }} custom path
    </div>
    <l-map style="height: 90%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
      <l-icon-default :image-path="path"></l-icon-default>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIconDefault } from 'vue2-leaflet';

export default {
  name: 'custom_path',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIconDefault,
  },
  data () {
    return {
      zoom:13,
      path: "/images/",
      center:[47.413220, -1.219482],
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
    }
  }
}
</script>
