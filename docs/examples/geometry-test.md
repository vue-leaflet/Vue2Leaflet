---
pageClass: example-page
---

# Geometry Examples

::: demo
<template>

  <div>
      <button @click="clickBtn">
        Change rectange style
      </button>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-circle
        :lat-lng="circle.center"
        :radius="circle.radius"
      />
      <l-rectangle
        :bounds="rectangle.bounds"
        :l-style="rectangle.style"
      />
      <l-polygon
        :lat-lngs="polygon.latlngs"
        :color="polygon.color"
      />
      <l-polyline
        :lat-lngs="polyline.latlngs"
        :color="polyline.color"
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LCircle,
  LRectangle,
  LPolygon,
  LPolyline,
  fixDefaultIcons
} from "vue2-leaflet";

fixDefaultIcons();

export default {
  name: "GeometryTest",
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LRectangle,
    LPolygon,
    LPolyline
  },
  data() {
    return {
      zoom: 11,
      center: [47.31322, -1.319482],
      circle: {
        center: latLng(47.41322, -1.0482),
        radius: 4500
      },
      rectangle: {
        bounds: [[47.341456, -1.397133], [47.303901, -1.243813]],
        style: { color: "red", weight: 5 }
      },
      polygon: {
        latlngs: [
          [47.2263299, -1.6222],
          [47.21024000000001, -1.6270065],
          [47.1969447, -1.6136169],
          [47.18527929999999, -1.6143036],
          [47.1794457, -1.6098404],
          [47.1775788, -1.5985107],
          [47.1676598, -1.5753365],
          [47.1593731, -1.5521622],
          [47.1593731, -1.5319061],
          [47.1722111, -1.5143967],
          [47.1960115, -1.4841843],
          [47.2095404, -1.4848709],
          [47.2291277, -1.4683914],
          [47.2533687, -1.5116501],
          [47.2577961, -1.5531921],
          [47.26828069, -1.5621185],
          [47.2657179, -1.589241],
          [47.2589612, -1.6204834],
          [47.237287, -1.6266632],
          [47.2263299, -1.6222]
        ],
        color: "#ff00ff"
      },
      polyline: {
        latlngs: [
          [47.334852, -1.509485],
          [47.342596, -1.328731],
          [47.241487, -1.190568],
          [47.234787, -1.358337]
        ],
        color: "green"
      },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  methods: {
    clickBtn() {
      this.rectangle.style.weight++;
      this.rectangle.style.color =
        this.rectangle.style.weight % 2 === 0 ? "blue" : "green";
    }
  }
};
</script>

:::
