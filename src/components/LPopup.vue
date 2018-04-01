<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

const props = {
  content: {
    default: '',
  },
  latLng: {
    type: [Object, Array]
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  name: 'LPopup',
  props: props,
  data() {
    return {
      ready: false,
    }
  },
  mounted() {
    this.mapObject = L.popup(this.options);
    if (this.latLng !== undefined) {
      this.mapObject.setLatLng(this.latLng);
    }
    this.mapObject.setContent(this.content || this.$el);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindPopup(this.mapObject);
  },
  beforeDestroy() {
    if (this.parentContainer.mapObject && this.parentContainer.mapObject.getPopup()) {
      this.parentContainer.mapObject.unbindPopup();
    }
  },
};
</script>
