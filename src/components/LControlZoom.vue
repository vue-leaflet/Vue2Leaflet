<script>
import propsBinder from '../utils/propsBinder.js';
import Control from '../mixins/Control.js';
import { mergeIgnoreUndefined } from '../utils/optionsUtils.js';

export default {
  name: 'LControlZoom',
  mixins: [Control],
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    zoomInText: {
      type: String,
      default: undefined
    },
    zoomInTitle: {
      type: String,
      default: undefined
    },
    zoomOutText: {
      type: String,
      default: undefined
    },
    zoomOutTitle: {
      type: String,
      default: undefined
    }
  },
  mounted () {
    const options = mergeIgnoreUndefined(
      this.options,
      this.controlOptions, {
        zoomInText: this.zoomInText,
        zoomInTitle: this.zoomInTitle,
        zoomOutText: this.zoomOutText,
        zoomOutTitle: this.zoomOutTitle
      });
    this.mapObject = L.control.zoom(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.addTo(this.$parent.mapObject);
  },
  render () {
    return null;
  }
};
</script>
