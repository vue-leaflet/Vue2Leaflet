<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

export default {
  name: 'LTooltip',
  props: {
    content: {
      type: String,
      default: ''
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
    this.mapObject = L.tooltip(this.options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.setContent(this.content || this.$el.cloneNode(true));
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy () {
    if (this.parentContainer.mapObject.getTooltip()) {
      this.parentContainer.mapObject.unbindTooltip();
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
