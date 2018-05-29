<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';

const LControl = L.Control.extend({
  element: undefined,
  onAdd(/* map */) {
    return this.element;
  },
  setElement (el) {
    this.element = el;
  }
});

const props = {
  position: {
    type: String,
    default: 'topright'
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'LControl',
  props: props,
  data() {
    return {
      mapObject: undefined
    };
  },
  computed: {
    /**
     * Nearest defined mapObject on an ancestor of this component.
     *
     * If the <l-control> is used in a Vue component that is not itself
     * a Leaflet component, but that is used inside an <l-map>, then the
     * mapObject to attach to will be higher up the chain than simply on
     * this.$parent.
     */
    parentMap() {
      var ancestor = this.$parent;
      while (ancestor.$parent && !ancestor.mapObject) {
        ancestor = ancestor.$parent;
      }

      return ancestor.mapObject;
    }
  },
  mounted() {
    const options = this.options;
    const otherPropertytoInitialize = [ 'position' ];
    for (var i = 0; i < otherPropertytoInitialize.length; i++) {
      const propName = otherPropertytoInitialize[i];
      if(this[propName] !== undefined) {
        options[propName] = this[propName];
      }
    }
    this.mapObject = new LControl(options);
    propsBinder(this, this.mapObject, props);
    // Give the underlying Leaflet Control a reference to the rendered
    // Vue control, so it can simply use that as the element to display.
    this.mapObject.setElement(this.$el);
    this.mapObject.addTo(this.parentMap);
  },
  beforeDestroy() {
    this.mapObject.remove();
  }
}
</script>
