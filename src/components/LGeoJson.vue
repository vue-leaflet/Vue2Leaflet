<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import L from 'leaflet'

const props = {
  geojson: {
    type: [Object, Array],
    custom: true,
    default: () => ({})
  },
  options: {
    type: Object,
    custom: true,
    default: () => ({})
  },
  optionsStyle: {
    type: [Object, Function],
    custom: true
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true
  }
};

export default {
  name: 'LGeoJson',
  props: props,
  mounted () {
    this.mapObject = L.geoJSON(this.geojson, this.mergedOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.parentContainer = findRealParent(this.$parent, true);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy () {
    this.parentContainer.mapObject.removeLayer(this.mapObject);
  },
  computed: {
    mergedOptions () {
      if (this.optionsStyle) {
        const options = L.Util.extend({}, this.options)
        options.style = this.optionsStyle
        return options
      } else {
        return this.options
      }
    }
  },
  methods: {
    setGeojson (newVal) {
      this.mapObject.clearLayers();
      this.mapObject.addData(newVal);
    },
    getGeoJSONData () {
      return this.mapObject.toGeoJSON();
    },
    getBounds () {
      return this.mapObject.getBounds();
    },
    setVisible (newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.mapObject.addTo(this.parentContainer.mapObject);
      } else {
        this.parentContainer.mapObject.removeLayer(this.mapObject);
      }
    },
    setOptions(newVal, oldVal) {
      // https://gist.github.com/js1568/7989256
      // destory layer group
      this.mapObject.clearLayers();
      // set new options
      L.setOptions(this.mapObject, this.mergedOptions);
      // recreate layer group
      this.mapObject.addData(this.geojson);
    },
    setOptionsStyle(newVal, oldVal) {
      this.mapObject.setStyle(newVal);
    }
  },
  render () {
    return null;
  }
};
</script>
