<template>
  <div />
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import TileLayerMixin from '../mixins/TileLayer.js';
import Options from '../mixins/Options.js';
import { tileLayer, DomEvent } from 'leaflet';

/**
 * Load tiles from a map server and display them accordingly to map zoom, center and size
 */
export default {
  name: 'LTileLayer',
  mixins: [TileLayerMixin, Options],
  props: {
    url: {
      type: String,
      default: null,
    },
    tileLayerClass: {
      type: Function,
      default: tileLayer,
    },
  },
  mounted() {
    const options = optionsMerger(this.tileLayerOptions, this);
    this.mapObject = this.tileLayerClass(this.url, options);
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
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>
import {LMap, LTileLayer} from 'vue2-leaflet';

export default {
  components: { LMap, LTileLayer, },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
    };
  }
}
</script>
:::
</docs>
