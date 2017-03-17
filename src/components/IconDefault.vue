<template>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  imagePath: {
    type: String,
    custom: true,
    default: "",
  }
};

export default {
  props: props,
  mounted() {
    L.Icon.Default.imagePath = this.imagePath;
    propsBinder(this, this.mapObject, props);
    if (this.$parent._isMounted)  {
      this.deferredMountedTo(this.$parent.mapObject);
    }
  },
  methods: {
    deferredMountedTo(parent) {},
    setImagePath(newVal, oldVal) {
      L.Icon.Default.imagePath = newVal;
    },
  }
};
</script>
