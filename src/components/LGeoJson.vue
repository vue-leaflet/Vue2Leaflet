<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import LayerGroup from '../mixins/LayerGroup.js';
import Options from '../mixins/Options.js';
import { geoJSON, DomEvent, setOptions } from 'leaflet';

/**
 * Easily display a geo-json on the map
 */
export default {
  name: 'LGeoJson',
  mixins: [LayerGroup, Options],
  props: {
    geojson: {
      type: [Object, Array],
      custom: true,
      default: () => ({}),
    },
    options: {
      type: Object,
      custom: true,
      default: () => ({}),
    },
    optionsStyle: {
      type: [Object, Function],
      custom: true,
      default: null,
    },
  },
  computed: {
    mergedOptions() {
      return optionsMerger(
        {
          ...this.layerGroupOptions,
          style: this.optionsStyle,
        },
        this
      );
    },
  },
  mounted() {
    this.mapObject = geoJSON(this.geojson, this.mergedOptions);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent, true);
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
  beforeDestroy() {
    this.parentContainer.mapObject.removeLayer(this.mapObject);
  },
  methods: {
    setGeojson(newVal) {
      this.mapObject.clearLayers();
      this.mapObject.addData(newVal);
    },
    getGeoJSONData() {
      return this.mapObject.toGeoJSON();
    },
    getBounds() {
      return this.mapObject.getBounds();
    },
    setOptions(newVal, oldVal) {
      this.mapObject.clearLayers();
      setOptions(this.mapObject, this.mergedOptions);
      this.mapObject.addData(this.geojson);
    },
    setOptionsStyle(newVal, oldVal) {
      this.mapObject.setStyle(newVal);
    },
  },
  render() {
    return null;
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-geo-json :geojson="geojson"></l-geo-json>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      geojson: null
    };
  },
  async created () {
    const response = await fetch('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson');
    this.geojson = await response.json();
  }
}
</script>
:::
</docs>
