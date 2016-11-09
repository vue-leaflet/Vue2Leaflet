<template>
  <div>
    <slot></slot>
  </div>
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
  'dragstart',
  'drag',
  'dragend',
  'move',
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];

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
    type: Object,
  },
  title: {
    type: String,
    custom: true,
    default: '',
  },
};

export default {
  props: props,
  mounted() {
    this.mapObject = L.marker(this.latLng, { draggable: this.draggable, title: this.title });
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
      var that = this.mapObject;
      _.forEach(this.$children, (child) => {
        child.deferredMountedTo(that);
      });
      if (this.visible) {
        this.mapObject.addTo(parent);
      }
    },
    setDraggable(newVal, oldVal) {
      newVal ? this.mapObject.dragging.enable() :this.mapObject.dragging.disable();
    },
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.parent);
      } else {
        this.parent.removeLayer(this.mapObject);
      }
    },
  }
};
</script>
