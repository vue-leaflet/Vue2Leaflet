<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import TileLayerWMS from '../mixins/TileLayerWMS.js';
import Options from '../mixins/Options.js';
import { tileLayer, DomEvent } from 'leaflet';

/**
 * Display WMS services as tile layers on the map
 */
export default {
  name: 'LWMSTileLayer',
  mixins: [TileLayerWMS, Options],
  props: {
    baseUrl: {
      type: String,
      default: null,
    },
  },
  mounted() {
    const options = optionsMerger(this.tileLayerWMSOptions, this);
    this.mapObject = tileLayer.wms(this.baseUrl, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-control-layers > </l-control-layers>
    <l-wms-tile-layer
        v-for="layer in layers"
        :key="layer.name"
        :base-url="baseUrl"
        :layers="layer.layers"
        :visible="layer.visible"
        :name="layer.name"
        layer-type="base">
    </l-wms-tile-layer>
  </l-map>
</template>

<script>
import {LMap, LWMSTileLayer, LControlLayers } from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LControlLayers,
    'l-wms-tile-layer': LWMSTileLayer
  },
  data () {
    return {
      zoom: 1,
      center: [47.313220, -1.319482],
      baseUrl: 'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
      layers: [
        {
          name: 'Weather Data',
          visible: true,
          format: 'image/png',
          layers: 'nexrad-n0r-900913',
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad"
        }
      ]
    };
  }
}
</script>
:::
</docs>
