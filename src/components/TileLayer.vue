<template>
</template>

<script>

import propsBinder from '../utils/propsBinder.js';
import propsBinder from '../utils/eventsBinder.js';

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
  params: {
    type: Object,
    default: function() {
      return {};
    }
  }
};

export default {
    props: props,
    mounted() {
      if (this.attribution) this.params['attribution'] = this.attribution;
      if (this.token) this.params['token'] = this.token;
      this.mapObject = L.tileLayer(this.url, this.params);
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
        this.params.token = val;
      }
    }
};
</script>
