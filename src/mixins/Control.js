export default {
  props: {
    position: {
      type: String,
      default: 'topright'
    }
  },
  mounted () {
    this.controlOptions = {
      position: this.position
    };
  },
  beforeDestroy () {
    if (this.mapObject) {
      this.mapObject.remove();
    }
  }
};
