<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Layer from '../mixins/Layer.js';

export default {
  name: 'LMarker',
  mixins: [Layer],
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
      default: () => new L.Icon.Default()
    },
    zIndexOffset: {
      type: Number,
      custom: false,
      default: null
    },
    options: {
      type: Object,
      default: () => ({})
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
    }, this.options);
    this.mapObject = L.marker(this.latLng, options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.ready = true;
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
        let oldLatLng = this.mapObject.getLatLng();
        let newLatLng = {
          lat: newVal[0] || newVal.lat,
          lng: newVal[1] || newVal.lng
        };
        if (newLatLng.lat !== oldLatLng.lat || newLatLng.lng !== oldLatLng.lng) {
          this.mapObject.setLatLng(newLatLng);
        }
      }
    }
  },
  render: function (h) {
    if (this.ready && this.$slots.default) {
      return h('div', {style: {display: 'none'}}, this.$slots.default);
    }
    return null;
  }
};
</script>
