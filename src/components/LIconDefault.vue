<script>
import propsBinder from '../utils/propsBinder.js';

const props = {
  imagePath: {
    type: String,
    custom: true,
    default: ''
  }
};

export default {
  name: 'LIconDefault',
  props: props,
  mounted () {
    L.Icon.Default.imagePath = this.imagePath;
    propsBinder(this, this.mapObject, props);
  },
  methods: {
    setImagePath (newVal, oldVal) {
      L.Icon.Default.imagePath = newVal;
    }
  },
  render () {
    return null;
  }
};
</script>
