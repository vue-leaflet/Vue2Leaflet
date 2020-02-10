<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import CircleMixin from '../mixins/Circle.js';
import Options from '../mixins/Options.js';
import { circle, DomEvent } from 'leaflet';

/**
 * Draw a path in the shape of a circle around a center positioned at `latLng` coordinates
 */
export default {
  name: 'LCircle',
  mixins: [CircleMixin, Options],
  props: {
    latLng: {
      type: [Object, Array],
      default: () => [0, 0],
    },
  },
  data() {
    return {
      ready: false,
    };
  },
  mounted() {
    const options = optionsMerger(this.circleOptions, this);
    this.mapObject = circle(this.latLng, options);
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
  methods: {},
};
</script>

<docs>
## Demo
::: demo
  <template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-circle
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
    />
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LCircle} from 'vue2-leaflet';


export default {
  components: {
    LMap,
    LTileLayer,
    LCircle
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      circle: {
        center: [47.413220, -1.0482],
        radius: 4500,
        color: 'red'
      }
    };
  }
}
</script>
:::
</docs>
