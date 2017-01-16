<template>
  <div>
    <div id="top_div">
      <h2>Custom path</h2>
        Marker is placed at {{ marker.lat }}, {{ marker.lng }}
        <br>
        Marker icon are retrived from {{ path }} custom path
    </div>
    <div id="bottom_div">
      <v-map :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :lat-lng="marker"></v-marker>
        <v-icondefault :image-path="path"></v-icondefault>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'custom_path',
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
