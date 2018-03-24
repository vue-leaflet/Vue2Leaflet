<template>
  <div>
    <div>
      <h3>Some examples</h3>
    </div>
    <div style="height: 47%; overflow: auto;">
      Zoom Level :
      <input v-model.number.sync="zoom" type="number"><br>
      Center : <span> {{ center }} </span><br>
      Bounds : <span> {{ bounds }} </span><br>
      <button name="button" @click="fitPolyline">Fit map to polyline</button><br><br>
      Tile Provider:
      <select v-model="tileProvider">
        <option v-for="provider in tileProviders" :value="provider">{{provider.name}}</option>
      </select>
      Zoom position:
      <select v-model="zoomPosition">
        <option v-for="position in Positions" :value="position">{{position}}</option>
      </select>
      Attribution position:
      <select v-model="attributionPosition">
        <option v-for="position in Positions" :value="position">{{position}}</option>
      </select>
      <hr/>
      <h3>List of Markers</h3>
      <button name="button" @click="addMarker">Add a marker</button></br>
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
          <td style="text-align: center"><input @click="removeMarker(index)" type="button" value='X'></td>
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
    <l-map style="height: 45%" :zoom.sync="zoom" :options="mapOptions" :center="center" :bounds="bounds" :min-zoom="minZoom" :max-zoom="maxZoom">
      <l-tile-layer :url="tileProvider.url" :attribution="tileProvider.attribution" :token="token"></l-tile-layer>
      <l-control-zoom :position="zoomPosition" />
      <l-control-attribution :position="attributionPosition" :prefix="attributionPrefix" />
      <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.position" :visible="item.visible" :draggable="item.draggable"
      @click="alert(item)" :icon="item.icon">
        <l-popup :content="item.tooltip"></l-popup>
        <l-tooltip :content="item.tooltip"></l-tooltip>
      </l-marker>
      <l-polyline v-for="item in polylines" :key="item.id" :lat-lngs="item.points" :visible="item.visible" @click="alert(item)"></l-polyline>
      <l-layer-group v-for="item in stuff" :key="item.id" :visible="item.visible">
        <l-layer-group :visible="item.markersVisible">
          <l-marker v-for="marker in item.markers" :key="marker.id" :visible="marker.visible" :draggable="marker.draggable" :lat-lng="marker.position" @click="alert(marker)">
          </l-marker>
        </l-layer-group>
        <l-polyline :lat-lngs="item.polyline.points" :visible="item.polyline.visible" @click="alert(item.polyline)"></l-polyline>
      </l-layer-group>
    </l-map>
  </div>
</template>

<script>
import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LPolyline, LLayerGroup, LTooltip, LPopup, LControlZoom, LControlAttribution } from 'vue2-leaflet';
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
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution
  },
  data () {
    return {
      center: [51.505, -0.09],
      opacity:0.6,
      token: 'your token if using mapbox',
      mapOptions: { zoomControl: false , attributionControl: false },
      zoom:13,
      minZoom:1,
      maxZoom:20,
      zoomPosition: 'topleft',
      attributionPosition: 'bottomright',
      attributionPrefix: 'Vue2Leaflet',
      Positions: ['topleft', 'topright', 'bottomleft', 'bottomright'],
      tileProviders: tileProviders,
      tileProvider: tileProviders[0],
      markers:[
        { id: "m1", position : {lat:51.505, lng:-0.09}, tooltip: "tooltip for marker1", draggable: true, visible: true, icon: L.icon.glyph({
          prefix: '',
          glyph: 'A'})
        },
        { id: "m2", position : {lat:51.8905, lng:-0.09}, tooltip: "tooltip for marker2", draggable: true, visible: false },
        { id: "m3", position : {lat:51.005, lng:-0.09}, tooltip: "tooltip for marker3", draggable: true, visible: true },
        { id: "m4", position : {lat:50.7605, lng:-0.09}, tooltip: "tooltip for marker4", draggable: true, visible: false }
      ],
      polylines: [
        { id: "p1", points : [{lat: 37.772, lng: -122.214},
                    {lat: 21.291, lng: -157.821},
                    {lat: -18.142, lng: -181.569},
                    {lat: -27.467, lng: -206.973}], visible: true },
        { id: "p2", points : [[-73.91, 40.78], [-87.62, 41.83], [-96.72, 32.76]], visible: true },
      ],
      stuff: [
        { id: "s1", markers: markers1, polyline: { points : poly1, visible: true}, visible: true, markersVisible: true},
      ],
      bounds: L.latLngBounds( { "lat": 51.476483373501964, "lng": -0.14668464136775586 }, { "lat": 51.52948330894063, "lng": -0.019140238291583955 })
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
    fitPolyline: function() {
      var bounds = L.latLngBounds(markers1.map((o) => o.position));
      this.bounds = bounds;
    },
  }
}
</script>
