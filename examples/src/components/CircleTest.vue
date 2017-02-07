<template>
  <div>
    <div id="top_div">
      <h2>Circle</h2>
        Circle is centered at {{ circleCenter.lat }}, {{ circleCenter.lng }} with a radius of {{ circleRadius }}
      </br>
      <input v-model="circleRadius" type="number">
      <br />
    </div>
    <div id="bottom_div">
      <v-map :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-circle :lat-lng="circleCenter" :radius="circleRadius"></v-circle>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
  name: 'CircleTest',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-circle': Vue2Leaflet.LCircle
  },
  data () {
    return {
      zoom:13,
      center:[47.413220, -1.219482],
      circleCenter: L.latLng(47.413220, -1.219482),
      circleRadius: 200,
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  }
}
</script>
