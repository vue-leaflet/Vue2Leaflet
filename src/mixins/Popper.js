export default {
  props: {
    content: {
      type: String,
      default: null,
      custom: true
    }
  },
  mounted () {
    this.popperOptions = {};
  },
  methods: {
    setContent (newVal) {
      if (this.mapObject && newVal !== null && newVal !== undefined) {
        this.mapObject.setContent(newVal);
      }
    }
  },
  render (h) {
    if (this.$slots.default) {
      return h('div', this.$slots.default);
    }
    return null;
  }
};
