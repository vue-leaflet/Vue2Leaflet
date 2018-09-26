<template>
  <div style="display: none;">
    <slot v-if="ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import Polyline from '../mixins/Polyline.js';

export default {
  name: 'LPolyline',
  mixins: [Polyline],
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
    this.mapObject = L.polyline(this.latLngs, this.polyLineOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
