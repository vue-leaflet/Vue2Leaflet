<template>
  <div>
    <div id="top_div">
      <h2>Jump on World Copy</h2>
      Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      <br/>
      <b>Top</b> map has <i>worldCopyJump</i> disabled, while <b>bottom</b> map has this feature enabled.
      <br/>
      When enabled, the marker is repeated on each "copy" of the world. Scroll both to left or right to see it in action.
      <v-map style="height: 80%" :zoom="zoom" :center="center" :minZoom="5" :worldCopyJump="false">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :lat-lng="marker"></v-marker>
      </v-map>
    </div>
    <div id="bottom_div">
      <v-map :zoom="zoom" :center="center" :minZoom="5" :worldCopyJump="true">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <v-marker :lat-lng="marker"></v-marker>
      </v-map>
    </div>
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
      zoom:5,
      center:[47.413220, -1.219482],
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482)
    }
  }
}
</script>
