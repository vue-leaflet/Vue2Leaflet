<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';
import findParentMapObject from '../utils/findParentMapObject.js';

const props = {
  latLng: {
    type: [Object, Array],
  },
  radius: {
    type: Number,
    default: 10
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
    default: true
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
  data() {
    return {
      ready: false,
      parentMapObject: undefined
    }
  },
  mounted() {
    const options = {};
    if (this.color) {
      options.color = this.color;
    }
    if (this.radius) {
      options.radius = this.radius;
    }
    if (this.lStyle) {
      for (var style in this.lStyle) {
        options[style] = this.lStyle[style];
      }
    }
    const otherPropertytoInitialize = ["smoothFactor", "noClip", "stroke", "color", "weight",
      "opacity", "lineCap", "lineJoin", "dashArray", "dashOffset", "fill", "fillColor",
      "fillOpacity", "fillRule", "className" ];

    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }

    this.mapObject = L.circleMarker(this.latLng, options);
    eventsBinder(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    if (this.visible) {
      this.mapObject.addTo(this.$parent.mapObject);
    }
  },
  beforeDestroy() {
    this.$parent.mapObject.removeLayer(this.mapObject);
  },
  methods: {
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.$parent.mapObject);
      } else {
        this.$parent.mapObject.removeLayer(this.mapObject);
      }
    },
    setLStyle(newVal, oldVal) {
      if (newVal == oldVal) return;
      this.mapObject.setStyle(newVal);
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
    }
  }
};
</script>
