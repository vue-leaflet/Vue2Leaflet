<script>
import propsBinder from '../utils/propsBinder.js';
import eventsBinder from '../utils/eventsBinder.js';

const props = {
  geojson: {
    type: [Object, Array],
    custom: true,
    default: () => ({}),
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  }
}

export default {
  name: 'v-geojson',
  props: props,
  mounted() {
    this.mapObject = L.geoJSON(this.geojson, this.options);
    eventsBinder(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    if (this.visible) {
      this.mapObject.addTo(this.$parent.mapObject);
    }
  },
  methods: {
    setGeojson(newVal) {
      this.mapObject.clearLayers();
      this.mapObject.addData(newVal);
    },
    getGeoJSONData() {
      return this.mapObject.toGeoJSON();
    },
    getBounds() {
      return this.mapObject.getBounds();
    },
    setVisible(newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.$parent.mapObject);
      } else {
        this.$parent.mapObject.removeLayer(this.mapObject);
      }
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
