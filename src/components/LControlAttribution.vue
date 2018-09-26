<script>
import propsBinder from '../utils/propsBinder.js';
import Control from '../mixins/Control';

export default {
  name: 'LControlAttribution',
  mixins: [Control],
  props: {
    prefix: {
      type: String,
      default: 'Leaflet'
    }
  },
  mounted () {
    this.attributionControlOptions = {
      ...this.controlOptions,
      prefix: this.prefix
    }
    this.mapObject = L.control.attribution(this.attributionControlOptions);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
