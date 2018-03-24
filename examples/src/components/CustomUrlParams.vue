<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Custom Url Params</h3>
        Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      </br>
    </div>
    <l-map style="height: 90%" :zoom="zoom" :center="center">
      <l-tile-layer :options="options" :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'example',
  components: {
    LMap,
    LTileLayer,
    LMarker
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
