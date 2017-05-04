<template>
</template>

<script>

export default {
    props: {
      url: String,
      attribution: String,
      token: String,
      params: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    mounted() {
      if (this.attribution) this.params['attribution'] = this.attribution;
      if (this.token) this.params['token'] = this.token;
      this.$tileLayer = L.tileLayer(this.url, this.params);
    },
    methods: {
      deferredMountedTo(parent) {
        this.$tileLayer.addTo(parent);
        var that = this.mapObject;
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].deferredMountedTo(that);
        }
      }
    }
};
</script>
