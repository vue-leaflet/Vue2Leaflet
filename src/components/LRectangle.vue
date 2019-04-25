<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import Polygon from '../mixins/Polygon.js';
import { rectangle, DomEvent } from 'leaflet';

export default {
  name: 'LRectangle',
  mixins: [Polygon],
  props: {
    bounds: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    const options = optionsMerger(this.polygonOptions, this);
    this.mapObject = rectangle(this.bounds, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  }
};
</script>
