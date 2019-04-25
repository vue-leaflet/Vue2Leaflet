<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import PolylineMixin from '../mixins/Polyline.js';
import { polyline, DomEvent } from 'leaflet';

export default {
  name: 'LPolyline',
  mixins: [PolylineMixin],
  props: {
    latLngs: {
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
    const options = optionsMerger(this.polyLineOptions, this);
    this.mapObject = polyline(this.latLngs, options);
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
