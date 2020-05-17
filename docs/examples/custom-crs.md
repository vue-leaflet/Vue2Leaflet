---
pageClass: example-page
---

# Custom CRS via Proj4

::: demo
<template>
  <l-map
    ref="map"
    :crs="crs"
    :zoom="zoom"
    :center="center"
    style="height: 400px; width: 100%;"
  >
    <l-tile-layer
        :url="url"
        :attribution="attribution"
    />
  </l-map>
</template>

<script>
import { CRS, latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import "proj4leaflet";
import proj4 from "proj4";

const swissCrs = new L.Proj.CRS(
  'EPSG:2056',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
  {
    resolutions: [
      4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
    ],
    origin: [2420000, 1350000]
  })

export default {
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      zoom: 18,
      center: latLng(47.56, 7.59),
      crs: swissCrs,
      url: 'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/2056/{z}/{x}/{y}.jpeg',
      attribution: '&copy; <a href="https://www.geo.admin.ch/">geo.admin.ch</a>'
    };
  }
};
</script>

:::