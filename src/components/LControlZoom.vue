<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  zoomInText: {
    type: String,
    default: '+'
  },
  zoomInTitle: {
    type: String,
    default: 'Zoom in'
  },
  zoomOutText: {
    type: String,
    default: '-'
  },
  zoomOutTitle: {
    type: String,
    default: 'Zoom out'
  },
  position: {
    type: String,
    default: 'topright'
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
    const otherPropertytoInitialize = [ "zoomInText", "zoomInTitle", "zoomOutText", "zoomOutTitle", "position" ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = L.control.zoom(options);
    propsBinder(this, this.mapObject, props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy() {
    this.mapObject.remove();
  },
  render() {
    return null;
  }
};
</script>
