<script>
import propsBinder from '../utils/propsBinder.js';
import eventsBinder from '../utils/eventsBinder.js';

const props = {
  url: String,
  attribution: {
    type: String,
    custom: true
  },
  detectRetina: {
    type: Boolean,
    custom: false,
    default: false
  },
  token: {
    type: String,
    custom: true
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
  options: {
    type: Object,
    default: function() {
      return {};
    }
  },
  tileLayerClass: {
    type: Function,
    default: L.tileLayer
  }
};

export default {
  props: props,
  mounted() {
    const options = this.options;
    const otherPropertytoInitialize = [ "attribution", "token", "detectRetina", "opacity", "zIndex" ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = this.tileLayerClass(this.url, options);
    eventsBinder(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  methods: {
    setAttribution(val, old) {
      let attributionControl = this.$parent.mapObject.attributionControl;
      attributionControl.removeAttribution(old).addAttribution(val);
    },
    setToken(val) {
      this.options.token = val;
    }
  },
  beforeDestroy() {
    this.$parent.mapObject.removeLayer(this.mapObject);
  },
  render() {
    return null;
  }
};
</script>
