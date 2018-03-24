<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findParentMapObject from '../utils/findParentMapObject.js';

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
  props: props,
  data() {
    return {
      ready: false,
      parentMapObject: undefined
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
    this.parentMapObject = findParentMapObject(this.$parent);
    this.parentMapObject.bindPopup(this.mapObject);
  },
  beforeDestroy() {
    if (this.parentMapObject.getPopup && this.parentMapObject.getPopup()) {
      this.parentMapObject.unbindPopup();
    }
  },
};
</script>
