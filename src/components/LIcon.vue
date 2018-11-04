<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';

export default {
  name: 'LIcon',
  props: {
    iconUrl: {
      type: String,
      custom: true,
      default: null
    },
    iconRetinaUrl: {
      type: String,
      custom: true,
      default: null
    },
    iconSize: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    iconAnchor: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    popupAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    tooltipAnchor: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    shadowUrl: {
      type: String,
      custom: true,
      default: null
    },
    shadowRetinaUrl: {
      type: String,
      custom: true,
      default: null
    },
    shadowSize: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    shadowAnchor: {
      type: [Object, Array],
      custom: true,
      default: null
    },
    bgPos: {
      type: [Object, Array],
      custom: true,
      default: () => [0, 0]
    },
    className: {
      type: String,
      custom: true,
      default: ''
    },
    options: {
      type: Object,
      custom: true,
      default: () => ({})
    },
    // TODO: Remove tempName here (and from the example)
    tempName: {
      type: String,
      custom: true,
      default: null
    }
  },

  data () {
    return {
      observer: null
    };
  },

  mounted () {
    propsBinder(this, null, this.$options.props);

    this.observer = new MutationObserver(() => {
      this.createIcon();
    });
    this.observer.observe(
      this.$el,
      { attributes: true, childList: true, characterData: true, subtree: true }
    );

    this.createIcon();
  },

  beforeDestroy () {
    if (this.parentContainer.mapObject) {
      this.parentContainer.mapObject.setIcon(null);
    }

    this.observer.disconnect();
  },

  methods: {
    createIcon () {
      console.log(Date.now() + ' - recreate ' + this.tempName);

      if (this.iconObject) {
        L.DomEvent.off(this.iconObject, this.$listeners);
      }

      const options = optionsMerger({
        iconUrl: this.iconUrl,
        iconRetinaUrl: this.iconRetinaUrl,
        iconSize: this.iconSize,
        iconAnchor: this.iconAnchor,
        popupAnchor: this.popupAnchor,
        tooltipAnchor: this.tooltipAnchor,
        shadowUrl: this.shadowUrl,
        shadowRetinaUrl: this.shadowRetinaUrl,
        shadowSize: this.shadowSize,
        shadowAnchor: this.shadowAnchor,
        bgPos: this.bgPos,
        className: this.className,
        html: this.$el.innerHTML || this.html
      }, this);

      if (options.html) {
        this.iconObject = L.divIcon(options);
      } else {
        this.iconObject = L.icon(options);
      }

      L.DomEvent.on(this.iconObject, this.$listeners);

      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.mapObject.setIcon(this.iconObject);
    },
    setIconUrl () {
      this.createIcon();
    },
    setIconRetinaUrl () {
      this.createIcon();
    },
    setIconSize () {
      this.createIcon();
    },
    setIconAnchor () {
      this.createIcon();
    },
    setPopupAnchor () {
      this.createIcon();
    },
    setTooltipAnchor () {
      this.createIcon();
    },
    setShadowUrl () {
      this.createIcon();
    },
    setShadowRetinaUrl () {
      this.createIcon();
    },
    setShadowAnchor () {
      this.createIcon();
    },
    setBgPos () {
      this.createIcon();
    },
    setClassName () {
      this.createIcon();
    },
    setHtml () {
      this.createIcon();
    }
  },

  render () {
    return null;
  }
};
</script>
