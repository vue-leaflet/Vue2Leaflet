<script>
import propsBinder from '../utils/propsBinder.js';
import Control from '../mixins/Control';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  name: 'LControlAttribution',
  mixins: [Control],
  props: {
    prefix: {
      type: String,
      default: undefined
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    const options = mergeIgnoreUndefined(
      this.options,
      this.controlOptions, {
        prefix: this.prefix
      });
    this.mapObject = L.control.attribution(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
