<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import PolylineMixin from '../mixins/Polyline.js';
import { polyline, DomEvent } from 'leaflet/src/Leaflet.js';

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
  }
};
</script>
