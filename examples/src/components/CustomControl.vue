<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Custom Leaflet Control</h3>
      Example of adding two basic controls to the map. One includes an
      element that responds to click events, and the other overrides the
      default position to place itself in the opposite corner.
    </div>
    <l-map style="height: 90%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-control class="example-custom-control">
        <p @click="showAlert">Click me</p>
      </l-control>
      <l-control class="custom-control-watermark" :position="'bottomleft'">
        Vue2Leaflet Watermark Control
      </l-control>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControl } from 'vue2-leaflet';

export default {
  name: 'example',
  components: {
    LMap,
    LTileLayer,
    LControl
  },
  data () {
    return {
      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }
  },
  methods: {
    showAlert() {
      alert('Click!');
    }
  }
}
</script>

<style>
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}
</style>
