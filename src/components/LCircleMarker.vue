<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import CircleMixin from '../mixins/Circle.js';
import { circleMarker, DomEvent } from 'leaflet/src/Leaflet.js';

export default {
  name: 'LCircleMarker',
  mixins: [CircleMixin],
  props: {
    latLng: {
      type: [Object, Array],
      default: () => []
    },
    pane: {
      type: String,
      default: 'markerPane'
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    const options = optionsMerger(this.circleOptions, this);
    this.mapObject = circleMarker(this.latLng, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
