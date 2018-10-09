export default {
  props: ['nodes'],
  render (h) {
    return h('div', this.nodes);
  }
};
