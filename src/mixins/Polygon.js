import Polyline from './Polyline';

export default {
  mixins: [Polyline],
  mounted () {
    this.polygonOptions = this.polyLineOptions;
  },
  methods: {
    getGeoJSONData () {
      return this.mapObject.toGeoJSON();
    }
  }
};
