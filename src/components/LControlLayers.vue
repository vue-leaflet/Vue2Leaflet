<script>
import { optionsMerger, propsBinder } from '../utils/utils.js';
import ControlMixin from '../mixins/Control.js';
import Options from '../mixins/Options.js';
import { control } from 'leaflet';

/**
 * Add any custom component as a leaflet control-layers
 */
export default {
  name: 'LControlLayers',
  mixins: [ControlMixin, Options],
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
    autoZIndex: {
      type: Boolean,
      default: true,
    },
    hideSingleBase: {
      type: Boolean,
      default: false,
    },
    sortLayers: {
      type: Boolean,
      default: false,
    },
    sortFunction: {
      type: Function,
      default: undefined,
    },
  },
  mounted() {
    const options = optionsMerger(
      {
        ...this.controlOptions,
        collapsed: this.collapsed,
        autoZIndex: this.autoZIndex,
        hideSingleBase: this.hideSingleBase,
        sortLayers: this.sortLayers,
        sortFunction: this.sortFunction,
      },
      this
    );
    this.mapObject = control.layers(null, null, options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.$parent.registerLayerControl(this);
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
  methods: {
    addLayer(layer) {
      if (layer.layerType === 'base') {
        this.mapObject.addBaseLayer(layer.mapObject, layer.name);
      } else if (layer.layerType === 'overlay') {
        this.mapObject.addOverlay(layer.mapObject, layer.name);
      }
    },
    removeLayer(layer) {
      this.mapObject.removeLayer(layer.mapObject);
    },
  },
  render() {
    return null;
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-control-layers position="topright"  ></l-control-layers>
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"/>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LControlLayers} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: true,
          attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
      ],
    };
  }
}
</script>
:::
</docs>
