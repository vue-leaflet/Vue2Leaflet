<script>
import { optionsMerger, propsBinder, findRealParent, debounce } from '../utils/utils.js';
import Layer from '../mixins/Layer.js';
import Options from '../mixins/Options.js';
import { marker, DomEvent, Icon, latLng } from 'leaflet';

export default {
  name: 'LMarker',
  mixins: [Layer, Options],
  props: {
    pane: {
      type: String,
      default: 'markerPane'
    },
    draggable: {
      type: Boolean,
      custom: true,
      default: false
    },
    latLng: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    icon: {
      type: [Object],
      custom: false,
      default: () => new Icon.Default()
    },
    zIndexOffset: {
      type: Number,
      custom: false,
      default: null
    }
  },
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    const options = optionsMerger({
      ...this.layerOptions,
      icon: this.icon,
      zIndexOffset: this.zIndexOffset,
      draggable: this.draggable
    }, this);
    this.mapObject = marker(this.latLng, options);
    DomEvent.on(this.mapObject, this.$listeners);
    this.mapObject.on('move', debounce(this.latLngSync, 100));
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.ready = true;
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  methods: {
    setDraggable (newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
      }
    },
    setLatLng (newVal) {
      if (newVal == null) {
        return;
      }

      if (this.mapObject) {
        const oldLatLng = this.mapObject.getLatLng();
        const newLatLng = latLng(newVal);
        if (newLatLng.lat !== oldLatLng.lat || newLatLng.lng !== oldLatLng.lng) {
          this.mapObject.setLatLng(newLatLng);
        }
      }
    },
    latLngSync (event) {
      this.$emit('update:latLng', event.latlng);
      this.$emit('update:lat-lng', event.latlng);
    }
  },
  render: function (h) {
    if (this.ready && this.$slots.default) {
      return h('div', { style: { display: 'none' } }, this.$slots.default);
    }
    return null;
  }
};
</script>
