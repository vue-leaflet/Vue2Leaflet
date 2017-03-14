<template>
  <div>
    <div id="top_div">
      <h2>WMS Layers</h2>
      <h3>With Layer selector</h3>
      <p>
        <b>NOTE:</b> Use layer symbol on the top right to select which layer you want to
        display.
        More information about WMS (Web Map Service) can be found on the
        <a href="http://leafletjs.com/examples/wms/wms.html">leaflet.js WMS example page</a>.
      </p>
      <v-map style="height: 78%" :zoom="zoom" :center="center">
        <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
        <wms-tilelayers v-for="layer in wms_layers"
                        :key="layer.url"
                        :baseurl="layer.url"
                        :format="layer.format"
                        :transparent="layer.transparent"
                        :layers="layer.layers"
                        :crs="layer.crs">
        </wms-tilelayers>
      </v-map>
    </div>
    <div id="bottom_div">
      <h3>Mulitple Layers displayed together</h3>
      <v-map style="height: 90%" :zoom="zoom" :center="center">
         <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
         <wms-tilelayer :key="wms_layers[0].url"
                       :baseurl="wms_layers[0].url"
                       :format="wms_layers[0].format"
                       :transparent="wms_layers[0].transparent"
                       ids="abfall_recycling_6_recyhof"
                       :crs="wms_layers[0].crs">
        </wms-tilelayer>
      </v-map>
    </div>
  </div>
</template>

<script>
  import Vue2Leaflet from 'vue2-leaflet';

  export default {
    name: 'wms-layers',
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'wms-tilelayer': Vue2Leaflet.WMSTileLayer,
      'wms-tilelayers': Vue2Leaflet.WMSTileLayers
    },
    data () {
      return {
        zoom: 12,
        center: [53.551086, 9.993682],
        url: 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        wms_layers: [
          {
            'url': 'http://geodienste.hamburg.de/HH_WMS_abfall_recycling?',
            'format': 'image/png',
            'transparent': true,
            'layers': [
              {'id': 'abfall_recycling_1_elektro', 'name': 'Elektro'},
              {'id': 'abfall_recycling_2_textil', 'name': 'Textil'},
              {'id': 'abfall_recycling_3_lvp', 'name': 'LVP'},
              {'id': 'abfall_recycling_4_glas', 'name': 'Glas'},
              {'id': 'abfall_recycling_5_papier', 'name': 'Papier'},
              {'id': 'abfall_recycling_6_recyhof', 'name': 'Recycling Hof'}
            ],
            'crs': L.CRS.EPSG4326
          }
        ]
      }
    }
  }
</script>
