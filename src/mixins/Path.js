import Layer from './Layer';
import InteractiveLayer from './InteractiveLayer';

export default {
  mixins: [Layer, InteractiveLayer],
  props: {
    lStyle: {
      type: Object,
      custom: true,
      default: null
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
    }
  },
  mounted () {
    this.pathOptions = {
      ...this.layerOptions,
      ...this.interactiveLayerOptions,
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
    };

    if (this.lStyle) {
      console.warn('lStyle is deprecated and is going to be removed in the next major version');
      for (var style in this.lStyle) {
        this.pathOptions[style] = this.lStyle[style];
      }
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
    setLStyle (newVal) {
      this.mapObject.setStyle(newVal);
    },
    setStroke (newVal) {
      this.mapObject.setStyle({ stroke: newVal });
    },
    setColor (newVal) {
      this.mapObject.setStyle({ color: newVal });
    },
    setWeight (newVal) {
      this.mapObject.setStyle({ weight: newVal });
    },
    setOpacity (newVal) {
      this.mapObject.setStyle({ opacity: newVal });
    },
    setLineCap (newVal) {
      this.mapObject.setStyle({ lineCap: newVal });
    },
    setLineJoin (newVal) {
      this.mapObject.setStyle({ lineJoin: newVal });
    },
    setDashArray (newVal) {
      this.mapObject.setStyle({ dashArray: newVal });
    },
    setDashOffset (newVal) {
      this.mapObject.setStyle({ dashOffset: newVal });
    },
    setFill (newVal) {
      this.mapObject.setStyle({ fill: newVal });
    },
    setFillColor (newVal) {
      this.mapObject.setStyle({ fillColor: newVal });
    },
    setFillOpacity (newVal) {
      this.mapObject.setStyle({ fillOpacity: newVal });
    },
    setFillRule (newVal) {
      this.mapObject.setStyle({ fillRule: newVal });
    },
    setClassName (newVal) {
      this.mapObject.setStyle({ className: newVal });
    }
  }
};
