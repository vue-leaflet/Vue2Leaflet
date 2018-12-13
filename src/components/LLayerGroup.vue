<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import LayerGroup from '../mixins/LayerGroup.js';

export default {
  name: 'LLayerGroup',
  mixins: [LayerGroup],
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = L.layerGroup();
    propsBinder(this, this.mapObject, this.$options.props);
    L.DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    if (this.visible) {
      this.parentContainer.addLayer(this);
    }
  }
};
</script>
