<template>
  <div style="display: none;">
    <slot v-if="ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import Circle from '../mixins/Circle.js';

export default {
  name: 'LCircleMarker',
  mixins: [Circle],
  props: {
    latLng: {
      type: [Object, Array],
      default: () => []
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = L.circleMarker(this.latLng, this.circleOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
