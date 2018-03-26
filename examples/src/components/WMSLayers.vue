<template>
  <div>
    <div style="height: 15%; overflow: auto;">
      <h3>WMS Layers with Layer selector</h3>
      <p>
        <b>NOTE:</b> Use layer symbol on the top right to select which layer you want to
        display.
        More information about WMS (Web Map Service) can be found on the
        <a href="http://leafletjs.com/examples/wms/wms.html">leaflet.js WMS example page</a>.
      </p>
    </div>
    <l-map style="height: 80%" :zoom="zoom" :center="center">
      <l-control-layers />
      <l-wms-tile-layer v-for="layer in layers" :key="layer.name" :baseUrl="baseUrl"
        :layers="layer.layers" :visible="layer.visible" :name="layer.name" layerType="base" />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LWMSTileLayer, LControlLayers } from 'vue2-leaflet';

export default {
  name: 'wms-layers',
  components: {
    LMap,
    LTileLayer,
    'l-wms-tile-layer': LWMSTileLayer,
    LControlLayers
  },
  data () {
    return {
      zoom: 4,
      center: [49, 12],
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      baseUrl: 'https://demo.boundlessgeo.com/geoserver/ows?',
      layers: [
        {
          name: 'Boundaries',
          visible: true,
          layers: 'ne:ne_10m_admin_0_boundary_lines_land',
        },
        {
          name: 'Countries',
          visible: false,
          layers: 'ne:ne_10m_admin_0_countries',
        },
        {
          name: 'Boundaries and Countries',
          visible: false,
          layers: 'ne:ne_10m_admin_0_boundary_lines_land,ne:ne_10m_admin_0_countries',
        }
      ]
    }
  }
}
</script>
