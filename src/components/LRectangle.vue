<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Polygon from '../mixins/Polygon.js';
import Options from '../mixins/Options.js';
import { rectangle, latLngBounds, DomEvent } from 'leaflet';

/**
 * Easily draw a rectangle on the map
 */
export default {
  name: 'LRectangle',
  mixins: [Polygon, Options],
  props: {
    bounds: {
      default: () => [[0,0],[0,0]],
      validator: value => value && latLngBounds(value).isValid(),
    },
  },
  data() {
    return {
      ready: false,
    };
  },
  mounted() {
    const options = optionsMerger(this.polygonOptions, this);
    this.mapObject = rectangle(this.bounds, options);
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
    <l-rectangle :bounds="rectangle.bounds" :l-style="rectangle.style"></l-rectangle>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LRectangle} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LRectangle
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      rectangle: {
        bounds: [[47.341456, -1.397133], [47.303901, -1.243813]],
        style: { color: 'red', weight: 3 }
      }
    };
  }
}
</script>
:::
</docs>
