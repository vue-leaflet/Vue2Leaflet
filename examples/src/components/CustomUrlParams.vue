<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Custom Url Params</h3>
        Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      </br>
    </div>
    <v-map style="height: 90%" :zoom="zoom" :center="center">
      <v-tilelayer :options="options" :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="marker"></v-marker>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'example',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },
  data () {
    return {
      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      options: {'color': 'red'},
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png?color={color}',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
    }
  }
}
</script>
