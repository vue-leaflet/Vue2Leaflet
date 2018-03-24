<script>
import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';

const props = {
  url: {
    type: String,
  },
  bounds: {
  },
  opacity: {
    type: Number,
    default: 1.0,
  },
  alt: {
    type: String,
    default: '',
  },
  interactive: {
    type: Boolean,
    default: false,
  },
  crossOrigin: {
    type: Boolean,
    default: false,
  }
};

export default {
  name: 'v-imageoverlay',
  props: props,
  mounted() {
    let options = {
      opacity: this.opacity,
      alt: this.alt,
      interactive: this.interactive,
      crossOrigin: this.crossOrigin,
    };
    this.mapObject = L.imageOverlay(this.url, this.bounds, options);
    eventsBinder(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  methods: {
    getBounds() {
      return this.mapObject.getBounds();
    },
  },
  beforeDestroy() {
    this.$parent.mapObject.removeLayer(this.mapObject);
  },
  render() {
    return null;
  }
};
</script>
