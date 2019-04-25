<script>
import { propsBinder } from '../utils/utils.js';
import { Icon } from 'leaflet';

export default {
  name: 'LIconDefault',
  props: {
    imagePath: {
      type: String,
      custom: true,
      default: ''
    }
  },
  mounted () {
    Icon.Default.imagePath = this.imagePath;
    propsBinder(this, {}, this.$options.props);
  },
  methods: {
    setImagePath (newVal) {
      Icon.Default.imagePath = newVal;
    }
  },
  render () {
    return null;
  }
};
</script>
