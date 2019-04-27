<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
import { propsBinder, findRealParent } from '../utils/utils.js';
import LayerGroupMixin from '../mixins/LayerGroup.js';
import { featureGroup, DomEvent } from 'leaflet';

export default {
  name: 'LFeatureGroup',
  mixins: [LayerGroupMixin],
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = featureGroup();
    propsBinder(this, this.mapObject, this.$options.props);
    DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent, true);
    if (this.visible) {
      this.parentContainer.addLayer(this);
    }
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  }
};
</script>
