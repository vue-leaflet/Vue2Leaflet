<template>
</template>

<script>
  import L from 'leaflet';

  export default {
    // Expects layers as array of objects with id and name properties
    props: ['baseurl', 'format', 'transparent', 'layers', 'crs'],
    mounted () {
      this.$basemaps = {};
      for (let layer of this.layers) {
        this.$basemaps[layer.name] = L.tileLayer.wms(this.baseurl, {
          format: this.format,
          transparent: this.transparent,
          layers: layer.id,
          crs: this.crs
        })
      }
    },
    methods: {
      deferredMountedTo (parent) {
        // Add layer control (by default top right, to allow switching between layers)
        L.control.layers(this.$basemaps).addTo(parent);
      }
    }
  }
</script>
