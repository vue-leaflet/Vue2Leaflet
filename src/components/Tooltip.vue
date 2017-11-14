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
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  }
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.tooltip(this.options);
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
      this.mapObject.setContent(this.content || this.$el);
      parent.bindTooltip(this.mapObject);
    },
  }
};
</script>
