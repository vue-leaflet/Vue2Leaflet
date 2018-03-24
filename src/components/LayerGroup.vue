<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import eventsBinder from '../utils/eventsBinder.js';
import findParentMapObject from '../utils/findParentMapObject.js';

const props = {
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  }
};

export default {
  name: 'v-layergroup',
  props: props,
  data() {
    return {
      ready: false,
      parentMapObject: undefined
    }
  },
  mounted() {
    this.mapObject = L.layerGroup();
    propsBinder(this, this.mapObject, props);
    eventsBinder(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentMapObject = findParentMapObject(this.$parent);
    if (this.visible) {
      this.mapObject.addTo(this.parentMapObject);
    }
  },
  beforeDestroy() {
    this.parentMapObject.removeLayer(this.mapObject);
  },
  methods: {
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.parentMapObject);
      } else {
        this.parentMapObject.removeLayer(this.mapObject);
      }
    },
  },
};
</script>
