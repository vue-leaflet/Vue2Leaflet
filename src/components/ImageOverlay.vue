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
  url: {
    type: String,
  },
  bounds: {
  },
  opacity: {
    type: Number,
    default: 1.0,
  },
  alt: {
    type: String,
    default: '',
  },
  interactive: {
    type: Boolean,
    default: false,
  },
  crossOrigin: {
    type: Boolean,
    default: false,
  }
};

export default {
  props: props,
  mounted() {
    let options = {
      opacity: this.opacity,
      alt: this.alt,
      interactive: this.interactive,
      crossOrigin: this.crossOrigin,
    };
    this.mapObject = L.imageOverlay(this.url, this.bounds, options);
    eventsBinder(this, this.mapObject, events);
    propsBinder(this, this.mapObject, props);
    if (this.$parent._isMounted) {
      this.deferredMountedTo(this.$parent.mapObject);
    }
  },
  methods: {
    deferredMountedTo(parent) {
      this.mapObject.addTo(parent);
    },
    getBounds() {
      return this.mapObject.getBounds();
    },
  },
  beforeDestroy() {
    this.$parent.mapObject.removeLayer(this.mapObject);
  }
};
</script>
