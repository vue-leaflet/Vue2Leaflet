---
pageClass: example-page
---

# Custom Leaflet Control

::: demo
<template>

  <div >
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-control class="example-custom-control">
        <p @click="showAlert">
          Click me
        </p>
      </l-control>
      <l-control
        :position="'bottomleft'"
        class="custom-control-watermark"
      >
        Vue2Leaflet Watermark Control
      </l-control>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControl, fixDefaultIcons } from "vue2-leaflet";

fixDefaultIcons()

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LControl
  },
  data() {
    return {
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  methods: {
    showAlert() {
      alert("Click!");
    }
  }
};
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

:::
