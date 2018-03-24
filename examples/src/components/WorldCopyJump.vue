<template>
  <div>
    <div style="height: 15%; overflow: auto;">
      <h3>Jump on World Copy</h3>
      Marker is placed at {{ marker.lat }}, {{ marker.lng }}
      <br/>
      <b>Top</b> map has <i>worldCopyJump</i> disabled, while <b>bottom</b> map has this feature enabled.
      <br/>
      When enabled, the marker is repeated on each "copy" of the world. Scroll both to left or right to see it in action.
    </div>
    <l-map style="height: 42%" :zoom="zoom" :center="center" :minZoom="5" :worldCopyJump="false">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
    <l-map style="height: 43%" :zoom="zoom" :center="center" :minZoom="5" :worldCopyJump="true">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
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
      zoom:5,
      center:[47.413220, -1.219482],
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482)
    }
  }
}
</script>
