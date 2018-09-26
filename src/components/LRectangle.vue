<template>
  <div style="display: none;">
    <slot v-if="ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import Polygon from '../mixins/Polygon.js';

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
    this.mapObject = L.rectangle(this.bounds, this.polygonOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
