<template>
  <div>
    <div id="top_div">
      <h2>Some examples</h2>
      Zoom Level :
      <input v-model.number="zoom" type="number">
      <button name="button" v-on:click="fitPolyline">Fit map to polyline</button>
      <br>
      Tile Provider:
      <select v-model="tileProvider">
        <option v-for="provider in tileProviders" :value="provider">{{provider.name}}</option>
      </select>
      <hr/>
      <h3>List of Markers</h3>
      <button name="button" v-on:click="addMarker">Add a marker</button></br>
      <table>
        <tr>
          <th>Marker</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Tooltip</th>
          <th>Is Draggable ?</th>
          <th>Is Visible ?</th>
          <th>Remove</th>
        </tr>

        <tr v-for="(item, index) in markers">
          <td>{{"Marker " + (index + 1)}}</td>
          <td><input v-model.number="item.position.lat" type="number"></td>
          <td><input v-model.number="item.position.lng" type="number"></td>
          <td><input v-model="item.tooltip" type="text"></td>
          <td style="text-align: center"><input v-model="item.draggable" type="checkbox"></td>
          <td style="text-align: center"><input v-model="item.visible" type="checkbox"></td>
          <td style="text-align: center"><input v-on:click="removeMarker(index)" type="button" value='X'></td>
        </tr>
      </table>
      <hr/>
      <table>
        <tr>
          <th>Layer</th>
          <th>Is Visible ?</th>
          <th>Are Markers visible ?</th>
          <th>Is Polyline visible ?</th>
        </tr>

        <tr v-for="(item, index) in stuff">
          <td>{{"Layer " + (index + 1)}}</td>
          <td style="text-align: center"><input v-model="item.visible" type="checkbox"></td>
          <td style="text-align: center"><input v-model="item.markersVisible" type="checkbox"></td>
          <td style="text-align: center"><input v-model="item.polyline.visible" type="checkbox"></td>
        </tr>
      </table>
      <hr/>
    </div>
    <div id="bottom_div">
      <v-map :padding="[200, 200]" :zoom="zoom" :bounds="bounds" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" v-on:l-zoomanim="zoomChanged">
        <v-tilelayer :url="tileProvider.url" :attribution="tileProvider.attribution" :token="token"></v-tilelayer>
        <v-marker v-for="item in markers" :key="item.id" :lat-lng="item.position" :visible="item.visible" :draggable="item.draggable"
        v-on:l-click="alert(item)" v-on:l-move="markerMoved($event, item)" :icon="item.icon">
          <v-popup :content="item.tooltip"></v-popup>
          <v-tooltip :content="item.tooltip"></v-tooltip>
        </v-marker>
        <v-poly v-for="item in polylines" :key="item.id" :lat-lngs="item.points" :visible="item.visible" v-on:l-click="alert(item)"></v-poly>
        <v-group v-for="item in stuff" :key="item.id" :visible="item.visible">
          <v-group :visible="item.markersVisible">
            <v-marker v-for="marker in item.markers" :key="marker.id" :visible="marker.visible" :draggable="marker.draggable" :lat-lng="marker.position" v-on:l-click="alert(marker)">
            </v-marker>
          </v-group>
          <v-poly :lat-lngs="item.polyline.points" :visible="item.polyline.visible" v-on:l-click="alert(item.polyline)"></v-poly>
        </v-group>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2Leaflet from 'vue2-leaflet';
import Glyph from 'leaflet.icon.glyph';

var markers1 = [
  { position: { lng:-1.219482, lat:47.413220}, visible: true, draggable: true},
  { position: { lng:-1.571045, lat:47.457809}},
  { position: { lng:-1.560059, lat:47.739323}},
  { position: { lng:-0.922852, lat:47.886881}},
  { position: { lng:-0.769043, lat:48.231991}},
  { position: { lng:0.395508, lat:48.268569}},
  { position: { lng:0.604248, lat:48.026672}},
  { position: { lng:1.285400, lat:47.982568}},
  { position: { lng:1.318359, lat:47.894248}},
  { position: { lng:1.373291, lat:47.879513}},
  { position: { lng:1.384277, lat:47.798397}},
  { position: { lng:1.329346, lat:47.754098}},
  { position: { lng:1.329346, lat:47.680183}},
  { position: { lng:0.999756, lat:47.635784}},
  { position: { lng:0.867920, lat:47.820532}},
  { position: { lng:0.571289, lat:47.820532}},
  { position: { lng:0.439453, lat:47.717154}},
  { position: { lng:0.439453, lat:47.613570}},
  { position: { lng:-0.571289, lat:47.487513}},
  { position: { lng:-0.615234, lat:47.680183}},
  { position: { lng:-0.812988, lat:47.724545}},
  { position: { lng:-1.054688, lat:47.680183}},
  { position: { lng:-1.219482, lat:47.413220}}
];

var poly1 = [
  { lng:-1.219482, lat:47.413220},
  { lng:-1.571045, lat:47.457809},
  { lng:-1.560059, lat:47.739323},
  { lng:-0.922852, lat:47.886881},
  { lng:-0.769043, lat:48.231991},
  { lng:0.395508, lat:48.268569},
  { lng:0.604248, lat:48.026672},
  { lng:1.285400, lat:47.982568},
  { lng:1.318359, lat:47.894248},
  { lng:1.373291, lat:47.879513},
  { lng:1.384277, lat:47.798397},
  { lng:1.329346, lat:47.754098},
  { lng:1.329346, lat:47.680183},
  { lng:0.999756, lat:47.635784},
  { lng:0.867920, lat:47.820532},
  { lng:0.571289, lat:47.820532},
  { lng:0.439453, lat:47.717154},
  { lng:0.439453, lat:47.613570},
  { lng:-0.571289, lat:47.487513},
  { lng:-0.615234, lat:47.680183},
  { lng:-0.812988, lat:47.724545},
  { lng:-1.054688, lat:47.680183},
  { lng:-1.219482, lat:47.413220}
];

var customIcon = L.icon({
  iconUrl: 'images/layers.png',
  shadowUrl: ''
});

const tileProviders = [
  {
    name: 'OpenStreetMap',
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'OpenTopoMap',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  },
];

export default {
  name: 'example',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-poly': Vue2Leaflet.Polyline,
    'v-group': Vue2Leaflet.LayerGroup,
    'v-tooltip': Vue2Leaflet.Tooltip,
    'v-popup': Vue2Leaflet.Popup
  },
  data () {
    return {
      zoom:13,
      center:[51.505, -0.09],
      minZoom:1,
      maxZoom:20,
      opacity:0.6,
      token: 'your token if using mapbox',
      tileProviders: tileProviders,
      tileProvider: tileProviders[0],
      markers:[
        { id: "1", position : {lat:51.505, lng:-0.09}, tooltip: "tooltip for marker1", draggable: true, visible: true, icon: L.icon.glyph({
          prefix: '',
          glyph: 'A'})
        },
        { id: "2", position : {lat:51.8905, lng:-0.09}, tooltip: "tooltip for marker2", draggable: true, visible: false },
        { id: "3", position : {lat:51.005, lng:-0.09}, tooltip: "tooltip for marker3", draggable: true, visible: true },
        { id: "4", position : {lat:50.7605, lng:-0.09}, tooltip: "tooltip for marker4", draggable: true, visible: false }
      ],
      polylines: [
        { id: "1", points : [{lat: 37.772, lng: -122.214},
                    {lat: 21.291, lng: -157.821},
                    {lat: -18.142, lng: -181.569},
                    {lat: -27.467, lng: -206.973}], visible: true },
        { id: "2", points : [[-73.91, 40.78], [-87.62, 41.83], [-96.72, 32.76]], visible: true },
      ],
      stuff: [
        { id: "1", markers: markers1, polyline: { points : poly1, visible: true}, visible: true, markersVisible: true},
      ],
      bounds: L.latLngBounds()
    }
  },
  methods: {
    alert(item) {
      alert('this is ' + JSON.stringify(item));
    },
    addMarker: function(event) {
      var newMarker = { position: {lat:50.5505, lng:-0.09}, draggable: true, visible: true};
      this.markers.push(newMarker);
    },
    removeMarker: function(index) {
      this.markers.splice(index, 1);
    },
    markerMoved: function(event, item) {
      Vue.set(item, 'position', event.latlng);
    },
    zoomChanged: function(event) {
      this.zoom = event.target.getZoom();
    },
    fitPolyline: function() {
      var bounds = L.latLngBounds(markers1.map((o) => o.position));
      this.bounds = bounds;
    }
  }
}
</script>
