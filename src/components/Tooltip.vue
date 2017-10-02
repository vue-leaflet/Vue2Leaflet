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
  options: {
    type: Object
  }
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
    if (this.parent.getTooltip()) {
      this.parent.unbindTooltip();
    }
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent;
      if (this.content) {
        this.parent.bindTooltip(this.content, this.options);
      }
    },
    setContent(newVal, oldVal) {
      if (newVal) {
        this.parent.bindTooltip(this.content, this.options);
      } else {
        if (this.parent.getTooltip()) {
          this.parent.unbindTooltip();
        }
      }
    },
  }
};
</script>
