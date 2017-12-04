<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>

const props = {
}

export default {
  props: props,
  data () {
    return {
      layers: []
    }
  },
  mounted () {
    this.mapObject = L.control.layers()
  },
  beforeDestroy () {
  },
  methods: {
    deferredMountedTo (parent) {
      var vm = this
      for (var i = 0; i < this.$children.length; i++) {
        if (typeof this.$children[i].deferredMountedTo === 'function') {
          this.$children[i].$on('l-add', function (e) {
            var id = e.target._leaflet_id
            if (vm.layers[id]) {
              return
            }
            var title = e.target.getAttribution()
            if (this.$attrs.title) {
              title = this.$attrs.title
            }

            vm.mapObject.addBaseLayer(e.target, title)
            vm.layers[id] = true
          })

          this.$children[i].deferredMountedTo(parent)
        }
      }
      this.parent = parent
      this.mapObject.addTo(parent)
    }
  }
}
</script>
