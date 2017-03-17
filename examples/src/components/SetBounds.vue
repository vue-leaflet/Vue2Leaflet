<template>
  <div>
    <div id="top_div" style="height: 100%">
      <h2>Set bounds</h2>
        Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      </br>
      <v-map :zoom="zoom" style="height: 90%" :center="center" :bounds="bounds">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :lat-lng="marker"></v-marker>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

var corner1 = L.latLng(40.712, -74.227);
var corner2 = L.latLng(40.774, -74.125);

export default {
  name: 'set-bounds',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },
  data () {
    return {
      zoom:13,
      center:[47.413220, -1.219482],
      bounds: L.latLngBounds(corner1, corner2),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
    }
  }
}
</script>
