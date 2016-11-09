<template>
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
    type: String,
    custom: true,
    default: '',
  },
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.tooltip();
    this.mapObject.setTooltipContent(this.content);
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
      parent.bindTooltip(this.content);
    },
    setContent(newVal, oldVal) {
      if (newVal) {
        this.parent.bindTooltip(this.content);
      } else {
        if (this.parent.getTooltip) {
          this.parent.unbindTooltip();
        }
      }
    },
  }
};
</script>
