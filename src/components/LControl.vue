<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

export default {
  name: 'LControl',
  data () {
  },
  mounted () {
    const LControl = L.Control.extend({
      element: undefined,
      onAdd () {
        return this.element;
      },
      setElement (el) {
        this.element = el;
      }
    });
    this.mapObject = new LControl(this.controlOptions);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.mapObject.setElement(this.$el);
    this.mapObject.addTo(this.parentContainer);
  }
};
</script>
