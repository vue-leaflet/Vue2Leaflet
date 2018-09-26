<template>
  <div style="display: none;">
    <slot v-if="ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

const props = {
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  layerType: {
    type: String,
    custom: true
  },
  name: {
    type: String,
    custom: true
  }
};

export default {
  name: 'LLayerGroup',
  props: props,
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = L.layerGroup();
    propsBinder(this, this.mapObject, props);
    L.DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    if (this.visible) {
      this.parentContainer.addLayer(this);
    }
  },
  beforeDestroy () {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer (layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }
      this.parentContainer.addLayer(layer, true);
    },
    removeLayer (layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
      this.parentContainer.removeLayer(layer, true);
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
    setName(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
    },
    setLayerType(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.parentContainer.removeLayer(this);
      if (this.visible) {
        this.parentContainer.addLayer(this);
      }
    }
  }
};
</script>
