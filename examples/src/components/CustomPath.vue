<template>
  <div>
    <div id="top_div" style="height: 100%">
      <h2>Custom path</h2>
        Marker is placed at {{ marker.lat }}, {{ marker.lng }}
        <br>
        Marker icon are retrived from {{ path }} custom path
      <v-map style="height: 90%" :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :lat-lng="marker"></v-marker>
        <v-icondefault :image-path="path"></v-icondefault>
      </v-map>
    </div>
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
  },
  methods: {

  }
}
</script>
