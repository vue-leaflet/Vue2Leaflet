<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { optionsMerger, propsBinder, findRealParent } from '../utils/utils.js';
import { DomEvent, divIcon, icon } from 'leaflet';

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
    }
  },

  data () {
    return {
      parentContainer: null,
      observer: null,
      recreationNeeded: false,
      swapHtmlNeeded: false
    };
  },

  mounted () {
    this.parentContainer = findRealParent(this.$parent);

    propsBinder(this, this.$parent.mapObject, this.$options.props);

    this.observer = new MutationObserver(() => {
      this.scheduleHtmlSwap();
    });
    this.observer.observe(
      this.$el,
      { attributes: true, childList: true, characterData: true, subtree: true }
    );
    this.scheduleCreateIcon();
  },

  beforeDestroy () {
    if (this.parentContainer.mapObject) {
      this.parentContainer.mapObject.setIcon(this.parentContainer.$props.icon);
    }

    this.observer.disconnect();
  },

  methods: {
    scheduleCreateIcon () {
      this.recreationNeeded = true;

      this.$nextTick(this.createIcon);
    },

    scheduleHtmlSwap () {
      this.htmlSwapNeeded = true;

      this.$nextTick(this.createIcon);
    },

    createIcon () {
      // If only html of a divIcon changed, we can just replace the DOM without the need of recreating the whole icon
      if (this.htmlSwapNeeded && !this.recreationNeeded && this.iconObject && this.parentContainer.mapObject.getElement()) {
        this.parentContainer.mapObject.getElement().innerHTML = this.$el.innerHTML;

        this.htmlSwapNeeded = false;
        return;
      }

      if (!this.recreationNeeded) {
        return;
      }

      if (this.iconObject) {
        DomEvent.off(this.iconObject, this.$listeners);
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
        this.iconObject = divIcon(options);
      } else {
        this.iconObject = icon(options);
      }

      DomEvent.on(this.iconObject, this.$listeners);

      this.parentContainer.mapObject.setIcon(this.iconObject);

      this.recreationNeeded = false;
      this.htmlSwapNeeded = false;
    },

    setIconUrl () {
      this.scheduleCreateIcon();
    },
    setIconRetinaUrl () {
      this.scheduleCreateIcon();
    },
    setIconSize () {
      this.scheduleCreateIcon();
    },
    setIconAnchor () {
      this.scheduleCreateIcon();
    },
    setPopupAnchor () {
      this.scheduleCreateIcon();
    },
    setTooltipAnchor () {
      this.scheduleCreateIcon();
    },
    setShadowUrl () {
      this.scheduleCreateIcon();
    },
    setShadowRetinaUrl () {
      this.scheduleCreateIcon();
    },
    setShadowAnchor () {
      this.scheduleCreateIcon();
    },
    setBgPos () {
      this.scheduleCreateIcon();
    },
    setClassName () {
      this.scheduleCreateIcon();
    },
    setHtml () {
      this.scheduleCreateIcon();
    }
  },

  render () {
    return null;
  }
};
</script>
