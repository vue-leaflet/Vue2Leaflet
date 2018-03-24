<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  baseUrl: String,
  layers: {
    type: String,
    default: ''
  },
  styles: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    default: 'image/jpeg'
  },
  options: {
    type: Object,
    default: function() {
      return {};
    }
  },
  transparent: {
    type: Boolean,
    custom: false,
  },
  version: {
    type: String,
    default: '1.1.1'
  },
  crs: {
    default: null,
  },
  upperCase: {
    type: Boolean,
    default: false
  },
  opacity: {
    type: Number,
    custom: false,
    default: 1.0
  },
  zIndex: {
    type: Number,
    default: 1
  },
};
export default {
  props: props,
  mounted () {
    const options = this.options;
    const otherPropertytoInitialize = [ 'layers', 'styles', 'format', 'transparent', 'version', 'crs', 'upperCase', 'zIndex', 'opacity' ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = L.tileLayer.wms(this.baseUrl, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy() {
    this.$parent.mapObject.removeLayer(this.mapObject);
  },
  render() {
    return null;
  }
}
</script>
