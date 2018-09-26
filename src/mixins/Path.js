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
    }
  },
  mounted () {
    this.pathOptions = {};
    if (this.lStyle) {
      console.warn('lStyle is deprecated and is going to be removed in the next major version');
      for (var style in this.lStyle) {
        this.pathOptions[style] = this.lStyle[style];
      }
    }
    const otherPropertytoInitialize = ['smoothFactor', 'noClip', 'stroke', 'color', 'weight',
      'opacity', 'lineCap', 'lineJoin', 'dashArray', 'dashOffset', 'fill', 'fillColor',
      'fillOpacity', 'fillRule', 'className'
    ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if (this[propName] !== undefined) {
        this.pathOptions[propName] = this[propName];
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
    setStroke (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.mapObject.setStyle({ stroke: newVal });
    },
    setColor (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
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
      if (newVal) {
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
