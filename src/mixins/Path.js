import Layer from './Layer';
import InteractiveLayer from './InteractiveLayer';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  mixins: [Layer, InteractiveLayer],
  props: {
    lStyle: {
      type: Object,
      custom: true,
      default: undefined
    },
    stroke: {
      type: Boolean,
      custom: true,
      default: undefined
    },
    color: {
      type: String,
      custom: true,
      default: undefined
    },
    weight: {
      type: Number,
      custom: true,
      default: undefined
    },
    opacity: {
      type: Number,
      custom: true,
      default: undefined
    },
    lineCap: {
      type: String,
      custom: true,
      default: undefined
    },
    lineJoin: {
      type: String,
      custom: true,
      default: undefined
    },
    dashArray: {
      type: String,
      custom: true,
      default: undefined
    },
    dashOffset: {
      type: String,
      custom: true,
      default: undefined
    },
    fill: {
      type: Boolean,
      custom: true,
      default: undefined
    },
    fillColor: {
      type: String,
      custom: true,
      default: undefined
    },
    fillOpacity: {
      type: Number,
      custom: true,
      default: undefined
    },
    fillRule: {
      type: String,
      custom: true,
      default: undefined
    },
    className: {
      type: String,
      custom: true,
      default: undefined
    }
  },
  mounted () {
    this.pathOptions = mergeIgnoreUndefined(this.layerOptions,
      this.interactiveLayerOptions,
      this.lStyle,
      {
        stroke: this.stroke,
        color: this.color,
        weight: this.weight,
        opacity: this.opacity,
        lineCap: this.lineCap,
        lineJoin: this.lineJoin,
        dashArray: this.dashArray,
        dashOffset: this.dashOffset,
        fill: this.fill,
        fillColor: this.fillColor,
        fillOpacity: this.fillOpacity,
        fillRule: this.fillRule,
        className: this.className
      });
    if (this.lStyle) {
      console.warn('lStyle is deprecated and is going to be removed in the next major version');
    }
  },
  beforeDestroy () {
    if (this.parentContainer) {
      this.parentContainer.removeLayer(this);
    } else {
      console.error('Missing parent container');
    }
  },
  methods: {
    setLStyle (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.mapObject.setStyle(newVal);
    },
    setStroke (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.mapObject.setStyle({ stroke: newVal });
    },
    setColor (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal !== undefined && newVal !== null) {
        this.mapObject.setStyle({ color: newVal });
      }
    },
    setWeight (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ weight: newVal });
      }
    },
    setOpacity (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal !== undefined && newVal !== null) {
        this.mapObject.setStyle({ opacity: newVal });
      }
    },
    setLineCap (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ lineCap: newVal });
      }
    },
    setLineJoin (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ lineJoin: newVal });
      }
    },
    setDashArray (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ dashArray: newVal });
      }
    },
    setDashOffset (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ dashOffset: newVal });
      }
    },
    setFill (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.mapObject.setStyle({ fill: newVal });
    },
    setFillColor (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ fillColor: newVal });
      }
    },
    setFillOpacity (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ fillOpacity: newVal });
      }
    },
    setFillRule (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ fillRule: newVal });
      }
    },
    setClassName (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.setStyle({ className: newVal });
      }
    }
  }
};
