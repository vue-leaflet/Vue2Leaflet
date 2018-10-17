<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import Control from '../mixins/Control.js';

export default {
  name: 'LControl',
  mixins: [Control],
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
    const options = optionsMerger(this.controlOptions, this.options);
    this.mapObject = new LControl(options);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.mapObject.setElement(this.$el);
    this.mapObject.addTo(this.parentContainer.mapObject);
  }
};
</script>
