<template>
</template>

<script>

import propsBinder from '../utils/propsBinder.js';
import eventsBinder from '../utils/eventsBinder.js';

const events = [
  'loading',
  'tileunload',
  'tileloadstart',
  'tileerror',
  'tileload',
  'load',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];

const props = {
  url: String,
  attribution: {
    type: String,
    custom: true
  },
  token: {
    type: String,
    custom: true
  },
  opacity: {
    type: Number,
    custom: false,
    default: 1.0
  },
  zIndex: {
    type: Number,
    default: 1
  },
  options: {
    type: Object,
    default: function() {
      return {};
    }
  }
};

export default {
  props: props,
  mounted() {
    const options = {};
    const otherPropertytoInitialize = [ "attribution", "token", "opacity", "zIndex" ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName]) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = L.tileLayer(this.url, this.options);
    eventsBinder(this, this.mapObject, events);
    propsBinder(this, this.mapObject, props);
  },
  methods: {
    deferredMountedTo(parent) {
      this.mapObject.addTo(parent);
      this.attributionControl = parent.attributionControl;
      var that = this.mapObject;
      for (var i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(that);
      }
    },
    setAttribution(val, old) {
      this.attributionControl.removeAttribution(old);
      this.attributionControl.addAttribution(val);
    },
    setToken(val) {
      this.options.token = val;
    }
  },
  beforeDestroy() {
    this.$parent.mapObject.removeLayer(this.mapObject);
  }
};
</script>
