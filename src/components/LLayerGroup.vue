<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { propsBinder, findRealParent } from '../utils/utils.js';
import LayerGroupMixin from '../mixins/LayerGroup.js';
import { layerGroup, DomEvent } from 'leaflet';

export default {
  name: 'LLayerGroup',
  mixins: [LayerGroupMixin],
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = layerGroup();
    propsBinder(this, this.mapObject, this.$options.props);
    DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    if (this.visible) {
      this.parentContainer.addLayer(this);
    }
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  }
};
</script>
