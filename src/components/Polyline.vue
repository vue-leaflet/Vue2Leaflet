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
  'add',
  'remove',
  'popupopen',
  'popupclose',
  'tooltipopen',
  'tooltipclose'
];

const props = {
  latLngs: {
    type: Array,
    default: () => []
  },
  lStyle: {
    type: Object,
    custom: true,
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  },
  smoothFactor: {
    type: Number,
    custom: true,
    default: 1.0
  },
  noClip: {
    type: Boolean,
    custom: true,
    default: false
  },
  stroke: {
    type: Boolean,
    custom: true,
    default: true
  },
  color: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  weight: {
    type: Number,
    custom: true,
    default: 3
  },
  opacity: {
    type: Number,
    custom: true,
    default: 1.0
  },
  lineCap: {
    type: String,
    custom: true,
    default: 'round'
  },
  lineJoin: {
    type: String,
    custom: true,
    default: 'round'
  },
  dashArray: {
    type: String,
    custom: true,
    default: null
  },
  dashOffset: {
    type: String,
    custom: true,
    default: null
  },
  fill: {
    type: Boolean,
    custom: true,
    default: false
  },
  fillColor: {
    type: String,
    custom: true,
    default: '#3388ff'
  },
  fillOpacity: {
    type: Number,
    custom: true,
    default: 0.2
  },
  fillRule: {
    type: String,
    custom: true,
    default: 'evenodd'
  },
  className: {
    type: String,
    custom: true,
    default: null
  },
};

export default {
  props: props,
  mounted() {
    const options = {};
    if (this.color) {
      options.color = this.color;
    }
    if (this.lStyle) {
      for (var style in this.lStyle) {
        options[style] = this.lStyle[style];
      }
    }
    const otherPropertytoInitialize = ["smoothFactor", "noClip", "stroke", "color", "weight", "opacity", "lineCap", "lineJoin", "dashArray", "dashOffset", "fill", "fillColor", "fillOpacity", "fillRule", "className" ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName]) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = L.polyline(this.latLngs, options);
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
      for (var i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(this.mapObject);
      }
      if (this.visible) {
        this.mapObject.addTo(parent);
      }
    },
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.parent);
      } else {
        this.parent.removeLayer(this.mapObject);
      }
    },
    setLStyle(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle(newVal);
    },
    setSmoothFactor(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ smoothFactor: newVal });
      }
    },
    setNoClip(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ noClip: newVal });
      }
    },
    setStroke(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({ stroke: newVal });
    },
    setColor(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ color: newVal });
      }
    },
    setWeight(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ weight: newVal });
      }
    },
    setOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ opacity: newVal });
      }
    },
    setLineCap(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ lineCap: newVal });
      }
    },
    setLineJoin(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ lineJoin: newVal });
      }
    },
    setDashArray(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ dashArray: newVal });
      }
    },
    setDashOffset(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ dashOffset: newVal });
      }
    },
    setFill(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle({ fill: newVal });
    },
    setFillColor(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ fillColor: newVal });
      }
    },
    setFillOpacity(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ fillOpacity: newVal });
      }
    },
    setFillRule(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ fillRule: newVal });
      }
    },
    setClassName(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ className: newVal });
      }
    },
    addLatLng(value) {
      this.mapObject.addLatLng(value);
    }
  }
};
</script>
