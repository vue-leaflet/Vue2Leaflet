<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

export default {
  name: 'LPopup',
  props: {
    content: {
      type: String,
      default: ''
    },
    latLng: {
      type: [Object, Array],
      default: () => []
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
    this.mapObject = L.popup(this.options);
    if (this.latLng !== undefined) {
      this.mapObject.setLatLng(this.latLng);
    }
    this.mapObject.setContent(this.content || this.$el.cloneNode(true));
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindPopup(this.mapObject);
  },
  beforeDestroy () {
    if (this.parentContainer.mapObject && this.parentContainer.mapObject.getPopup()) {
      this.parentContainer.mapObject.unbindPopup();
    }
  },
  render (createElement) {
    if (!this.ready && this.$slots.default) {
      return createElement('div', this.$slots.default);
    }
    return null;
  }
};
</script>
