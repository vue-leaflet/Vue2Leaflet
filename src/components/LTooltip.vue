<template>
  <div>
    <slot v-if="!ready"/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

const props = {
  content: {
    default: ''
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'LTooltip',
  props: props,
  data () {
    return {
      ready: false
    };
  },
  mounted () {
    this.mapObject = L.tooltip(this.options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.setContent(this.content || this.$el.cloneNode(true));
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy () {
    if (this.parentContainer.mapObject.getTooltip()) {
      this.parentContainer.mapObject.unbindTooltip();
    }
  }
};
</script>
