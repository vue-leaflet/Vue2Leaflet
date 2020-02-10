<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import PolygonMixin from '../mixins/Polygon.js';
import Options from '../mixins/Options.js';
import { polygon, DomEvent } from 'leaflet';

/**
 * Easily draw a polygon on the map
 */
export default {
  name: 'LPolygon',
  mixins: [PolygonMixin, Options],
  props: {
    latLngs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ready: false,
    };
  },
  mounted() {
    const options = optionsMerger(this.polygonOptions, this);
    this.mapObject = polygon(this.latLngs, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
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
    <l-tile-layer :url="url"></l-tile-layer>
    <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LPolygon} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      polygon: {
        latlngs: [[47.2263299, -1.6222], [47.21024000000001, -1.6270065], [47.1969447, -1.6136169], [47.18527929999999, -1.6143036], [47.1794457, -1.6098404], [47.1775788, -1.5985107], [47.1676598, -1.5753365], [47.1593731, -1.5521622], [47.1593731, -1.5319061], [47.1722111, -1.5143967], [47.1960115, -1.4841843], [47.2095404, -1.4848709], [47.2291277, -1.4683914], [47.2533687, -1.5116501], [47.2577961, -1.5531921], [47.26828069, -1.5621185], [47.2657179, -1.589241], [47.2589612, -1.6204834], [47.237287, -1.6266632], [47.2263299, -1.6222]],
        color: 'green'
      },
    };
  }
}
</script>
:::
</docs>
