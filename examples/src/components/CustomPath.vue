<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Custom path</h3>
        Marker icon are retrived from {{ path }} custom path
    </div>
    <v-map style="height: 90%" :zoom="zoom" :center="center">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="marker"></v-marker>
      <v-icondefault :image-path="path"></v-icondefault>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'custom_path',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-icondefault': Vue2Leaflet.IconDefault
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
