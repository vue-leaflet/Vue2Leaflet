<template>
</template>

<script>

import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';

const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseover',
  'mouseout',
  'contextmenu',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];

const props = {
  latLngs: {
    type: Array,
    default: []
  },
  style: {
    type: Object,
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  },
  color: {
    type: String,
    default: 'red'
  }
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.polyline(this.latLngs, { color: this.color });
    eventsBinder(this, this.mapObject, events);
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
    addLatLng(value) {
      this.mapObject.addLatLng(value);
    }
  }
};
</script>
