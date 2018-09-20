<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

const props = {
  url: {
    type: String
  },
  bounds: {
  },
  opacity: {
    type: Number,
    default: 1.0
  },
  alt: {
    type: String,
    default: ''
  },
  interactive: {
    type: Boolean,
    default: false
  },
  crossOrigin: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};

export default {
  name: 'LImageOverlay',
  props: props,
  mounted () {
    let options = {
      opacity: this.opacity,
      alt: this.alt,
      interactive: this.interactive,
      crossOrigin: this.crossOrigin
    };
    this.mapObject = L.imageOverlay(this.url, this.bounds, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy () {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (this.mapObject) {
        if (newVal) {
          this.parentContainer.addLayer(this);
        } else {
          this.parentContainer.removeLayer(this);
        }
      }
    },
    getBounds () {
      return this.mapObject.getBounds();
    }
  },
  render () {
    return null;
  }
};
</script>
