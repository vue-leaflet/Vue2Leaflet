export default {
  props: {
    content: {
      type: String,
      default: null,
      custom: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    this.popperOptions = { ...this.options };
  },
  methods: {
    setContent (newVal) {
      if (this.mapObject) {
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
