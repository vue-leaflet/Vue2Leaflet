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
      console.log("deferredMountedTo");
      var that = this.mapObject;
      this.parent = parent;
      _.forEach(this.$children, (child) => {
        child.deferredMountedTo(that);
      });
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
