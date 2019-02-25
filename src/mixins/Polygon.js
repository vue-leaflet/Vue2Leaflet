import Polyline from './Polyline';

export default {
  mixins: [Polyline],
  props: {
    fill: {
      type: Boolean,
      custom: true,
      default: true
    }
  },
  mounted () {
    this.polygonOptions = this.polyLineOptions;
  },
  methods: {
    getGeoJSONData () {
      return this.mapObject.toGeoJSON();
    }
  }
};
