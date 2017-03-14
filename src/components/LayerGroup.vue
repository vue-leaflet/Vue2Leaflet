<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  }
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.layerGroup();
    propsBinder(this, this.mapObject, props);
    if (this.$parent._isMounted)  {
      this.deferredMountedTo(this.$parent.mapObject);
    }
  },
  beforeDestroy() {
    this.setVisible(false);
  },
  methods: {
    deferredMountedTo(parent) {
      var that = this.mapObject;
      for (var i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(that);
      }
      this.parent = parent;
      if (this.visible) {
        this.mapObject.addTo(parent);
      }
    },
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.parent);
      } else {
        this.parent.removeLayer(this.mapObject);
      }
    },
  }
};
</script>
