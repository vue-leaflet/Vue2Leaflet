<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import PolylineMixin from '../mixins/Polyline.js';
import Options from '../mixins/Options.js';
import { polyline, DomEvent } from 'leaflet';

/**
 * Easily draw a polyline on the map
 */
export default {
  name: 'LPolyline',
  mixins: [PolylineMixin, Options],
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
    const options = optionsMerger(this.polyLineOptions, this);
    this.mapObject = polyline(this.latLngs, options);
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
    <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LPolyline} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      polyline: {
        latlngs: [[47.334852, -1.509485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
        color: 'green'
      }
    };
  }
}
</script>
:::
</docs>
