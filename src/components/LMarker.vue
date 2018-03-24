<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findParentMapObject from '../utils/findParentMapObject.js';

const props = {
  draggable: {
    type: Boolean,
    custom: true,
    default: false,
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  },
  latLng: {
    type: [Object, Array]
  },
  icon: {
    custom: false,
    default: () => new L.Icon.Default(),
  },
  zIndexOffset: {
    type: Number,
    custom: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  props: props,
  data() {
    return {
      ready: false,
      parentMapObject: undefined
    }
  },
  mounted() {
    const options = this.options;
    if (this.icon) {
      options.icon = this.icon;
    }
    options.draggable = this.draggable;
    this.mapObject = L.marker(this.latLng, options);
    this.mapObject.on('move', (ev) => {
      if (Array.isArray(this.latLng)) {
        this.latLng[0] = ev.latlng.lat;
        this.latLng[1] = ev.latlng.lng;
      } else {
        this.latLng.lat = ev.latlng.lat;
        this.latLng.lng = ev.latlng.lng;
      }
    });
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
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
    setDraggable(newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
    },
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (this.mapObject) {
        if (newVal) {
          this.mapObject.addTo(this.parentMapObject);
        } else {
          this.parentMapObject.removeLayer(this.mapObject);
        }
      }
    }
  }
};
</script>
