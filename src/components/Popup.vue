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
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.popup(this.options);
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
      this.setContent(this.content || this.$el);
      // bind on mapObject so the options for the popup can be kept
      parent.bindPopup(this.mapObject);
    },
    setContent(newVal, oldVal) {
      if (typeof newVal == 'string') {
        this.$el.innerHTML = newVal
      } else {
        this.mapObject.setContent(newVal)
      }
    },
  }
};
</script>
