<script>
  export default {
    name: 'v-wmstilelayers',
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
      L.control.layers(this.$basemaps).addTo(this.$parent.mapObject);
    },
    render() {
      return null;
    }
  }
</script>
