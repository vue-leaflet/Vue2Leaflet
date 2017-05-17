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
    watch: {
      url (val) {
        this.$tileLayer.setUrl(val);
      },
      attribution (val, old) {
        this.$attributionControl.removeAttribution(old);
        this.$attributionControl.addAttribution(val);
      },
      token (val) {
        this.params.token = val;
      }
    },
    methods: {
      deferredMountedTo(parent) {
        this.$tileLayer.addTo(parent);
        this.$attributionControl = parent.attributionControl;
        var that = this.mapObject;
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].deferredMountedTo(that);
        }
      }
    }
};
</script>
