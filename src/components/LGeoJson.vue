<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import LayerGroup from '../mixins/LayerGroup.js';
import { geoJSON, DomEvent, setOptions } from 'leaflet';

export default {
  name: 'LGeoJson',
  mixins: [LayerGroup],
  props: {
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
      custom: true,
      default: null
    }
  },
  computed: {
    mergedOptions () {
      return optionsMerger({
        ...this.layerGroupOptions,
        style: this.optionsStyle
      }, this);
    }
  },
  mounted () {
    this.mapObject = geoJSON(this.geojson, this.mergedOptions);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent, true);
    this.parentContainer.addLayer(this, !this.visible);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  beforeDestroy () {
    this.parentContainer.mapObject.removeLayer(this.mapObject);
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
    setOptions (newVal, oldVal) {
      this.mapObject.clearLayers();
      setOptions(this.mapObject, this.mergedOptions);
      this.mapObject.addData(this.geojson);
    },
    setOptionsStyle (newVal, oldVal) {
      this.mapObject.setStyle(newVal);
    }
  },
  render () {
    return null;
  }
};
</script>
