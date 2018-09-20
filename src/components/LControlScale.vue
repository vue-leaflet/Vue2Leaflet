<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  maxWidth: {
    type: Number,
    default: 100
  },
  metric: {
    type: Boolean,
    default: true
  },
  imperial: {
    type: Boolean,
    default: true
  },
  updateWhenIdle: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'topright'
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'LControlScale',
  props: props,
  mounted () {
    const options = this.options;
    const otherPropertytoInitialize = [ 'maxWidth', 'metric', 'imperial', 'updateWhenIdle', 'position' ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if (this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = L.control.scale(options);
    propsBinder(this, this.mapObject, props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy () {
    this.mapObject.remove();
  },
  render () {
    return null;
  }
};
</script>
