<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import L from 'leaflet';
import LayerGroup from '../mixins/LayerGroup.js';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

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
      default: undefined
    }
  },
  computed: {
    mergedOptions () {
      return mergeIgnoreUndefined(
        this.options,
        this.layerGroupOptions,
        {
          style: this.optionsStyle
        }
      );
    }
  },
  mounted () {
    this.mapObject = L.geoJSON(this.geojson, this.mergedOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent, true);
    this.parentContainer.addLayer(this, !this.visible);
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
      L.setOptions(this.mapObject, this.mergedOptions);
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
