<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import eventsBinder from '../utils/eventsBinder.js';
import propsBinder from '../utils/propsBinder.js';
import findParentMapObject from '../utils/findParentMapObject.js';

const props = {
  content: {
    default: '',
  },
  options: {
    type: Object,
    default: () => ({}),
  }
};

export default {
  props: props,
  data() {
    return {
      parentMapObject: undefined
    }
  },
  mounted() {
    this.mapObject = L.tooltip(this.options);
    eventsBinder(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.mapObject.setContent(this.content || this.$el);
    this.parentMapObject = findParentMapObject(this.$parent);
    this.parentMapObject.bindTooltip(this.mapObject);
  },
  beforeDestroy() {
    if (this.parentMapObject.getTooltip()) {
      this.parentMapObject.unbindTooltip();
    }
  },
};
</script>
