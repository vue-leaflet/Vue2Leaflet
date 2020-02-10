<template>
  <div />
</template>

<script>
import Vue from 'vue';
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import GridLayerMixin from '../mixins/GridLayer.js';
import Options from '../mixins/Options.js';
import { GridLayer, DomEvent, DomUtil } from 'leaflet';

/**
 * Creates a map layer where each tile is an instantiated Vue component.
 * Each tile component is given `coords` props by `l-grid-layer` to indicate
 * the zoom level and position of the tile
 * (see https://leafletjs.com/examples/extending/extending-2-layers.html#lgridlayer-and-dom-elements).
 */
export default {
  name: 'LGridLayer',
  mixins: [GridLayerMixin, Options],

  props: {
    tileComponent: {
      type: Object,
      custom: true,
      required: true,
    },
  },

  data() {
    return {
      tileComponents: {},
    };
  },

  computed: {
    TileConstructor() {
      return Vue.extend(this.tileComponent);
    },
  },

  mounted() {
    const GLayer = GridLayer.extend({});
    const options = optionsMerger(this.gridLayerOptions, this);
    this.mapObject = new GLayer(options);
    DomEvent.on(this.mapObject, this.$listeners);
    this.mapObject.on('tileunload', this.onUnload, this);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.createTile = this.createTile;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit('ready', this.mapObject);
    });
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this.mapObject);
    this.mapObject.off('tileunload', this.onUnload);
    this.mapObject = null;
  },

  methods: {
    createTile(coords) {
      const div = DomUtil.create('div');
      const dummy = DomUtil.create('div');
      div.appendChild(dummy);

      const tileInstance = new this.TileConstructor({
        el: dummy,
        parent: this,
        propsData: {
          coords: coords,
        },
      });

      const key = this.mapObject._tileCoordsToKey(coords);
      this.tileComponents[key] = tileInstance;

      return div;
    },

    onUnload(e) {
      const key = this.mapObject._tileCoordsToKey(e.coords);
      if (typeof this.tileComponents[key] !== 'undefined') {
        this.tileComponents[key].$destroy();
        this.tileComponents[key].$el.remove();
        delete this.tileComponents[key];
      }
    },

    setTileComponent(newVal) {
      this.mapObject.redraw();
    },
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-grid-layer :tile-component="tileComponent"></l-grid-layer>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LGridLayer} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LGridLayer
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      tileComponent: {
        name: 'tile-component',
        props: {
          coords: {
            type: Object,
            required: true
          }
        },
        template: '<div>Coords: {{coords.x}}, {{coords.y}}, {{coords.z}}</div>'
      },
    };
  }
}
</script>
:::
</docs>
