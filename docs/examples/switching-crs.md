---
pageClass: example-page
---

# Switching between CRS

::: demo
<template>
  <div>
    <button @click="layerIndex = 0">map 1</button> <button @click="layerIndex = 1">map 2</button> 
    <l-map
      ref="map"
      :crs="layer.crs"
      :zoom="zoom"
      :center="center"
      style="height: 400px; width: 100%;"
    >
      <l-tile-layer
        :url="layer.url"
        :subdomains="layer.subdomains"
        :attribution="layer.attribution"
      />
    </l-map>
  </div>
</template>

<script>
import { CRS, latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      zoom: 14,
      center: latLng(47.56, 7.59),
      layerIndex: 0,
      layers: [
          { 
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          },
          {
            url: 'https://vec01.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}',
            subdomains: '1,2,3,4',
            attribution: '&copy; <a href="http://yandex.ru/copyright">Yandex</a>',
            crs: CRS.EPSG3395
          }
      ]
    };
  },
  computed: {
    layer () {
      return this.layers[this.layerIndex]
    }
  }
};
</script>
:::

## Note about custom CRS

Switching between CRS layers can be tricky if you have layers with [Custom CRS](/examples/custom-crs.html). Such layers 
can have unique zoom scales set, so it's impossible to map current viewport between layers one-to-one. To improve situation a bit you can use leaflet [fractional zoom](https://leafletjs.com/examples/zoom-levels/#fractional-zoom) feature via [zoomSnap](https://leafletjs.com/reference-1.6.0.html#map-zoomsnap) and [zoomDelta](https://leafletjs.com/reference-1.6.0.html#map-zoomdelta) options.