<script>
  export default {
    name: 'v-wmstilelayer',
    // Expects ids as one or more WMS layer IDs (comma-separated)
    props: ['baseurl', 'format', 'transparent', 'ids', 'crs'],
    mounted () {
      this.$tileLayer = L.tileLayer.wms(this.baseurl, {
        format: this.format,
        transparent: this.transparent,
        layers: this.ids,
        crs: this.crs
      });
      this.$tileLayer.addTo(this.$parent.mapObject);
    },
    render() {
      return null;
    }
  }
</script>
