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
    type: [Object, Array]
  },
  icon: {
    custom: false,
    default: () => new L.Icon.Default(),
  },
  zIndexOffset: {
    type: Number,
    custom: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  props: props,
  mounted() {
    const options = this.options;
    if (this.icon) {
      options.icon = this.icon;
    }

    options.draggable = this.draggable;
    this.mapObject = L.marker(this.latLng, options);
    eventsBinder(this, this.mapObject, events);
    propsBinder(this, this.mapObject, props);
    if (this.$parent._isMounted) {
      this.deferredMountedTo(this.$parent.mapObject);
    }
  },
  beforeDestroy() {
    this.setVisible(false);
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent;
      for (var i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(this.mapObject);
      }
      if (this.visible) {
        this.mapObject.addTo(parent);
      }
    },
    setDraggable(newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
    },
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (this.mapObject) {
        if (newVal) {
          this.mapObject.addTo(this.parent);
        } else {
          this.parent.removeLayer(this.mapObject);
        }
      }
    }
  }
};
</script>
