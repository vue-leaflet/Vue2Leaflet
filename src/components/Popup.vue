<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>

import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';

const events = [
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];

const props = {
  content: {
    custom: true,
    default: '',
  }
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.popup();
    eventsBinder(this, this.mapObject, events);
    propsBinder(this, this.mapObject, props);
    if (this.$parent._isMounted)  {
      this.deferredMountedTo(this.$parent.mapObject);
    }
  },
  beforeDestroy() {
    if (this.parent.getPopup()) {
      this.parent.unbindPopup();
    }
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent;
      if (this.content) {
        this.setContent(this.content);
      }
      parent.bindPopup(this.$el);
    },
    setContent(newVal, oldVal) {
      this.$el.innerHTML = newVal;
    },
  }
};
</script>
