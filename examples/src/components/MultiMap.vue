<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>Two maps</h3>
    </div>
    <l-map
      :zoom.sync="zoom"
      :center="center"
      :options="option1"
      :bounds="bounds"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      style="height: 45%"
    >
      <l-tile-layer :url="url" :attribution="attribution" :token="token" />
      <l-marker
        v-for="item in markers"
        :key="item.id"
        :lat-lng="item.position"
        :visible="item.visible"
        :draggable="item.draggable"
        @click="alert(item)"
      />
      <l-polyline
        v-for="item in polylines"
        :key="item.id"
        :lat-lngs="item.points"
        :visible="item.visible"
        @click="alert(item)"
      />
      <l-layer-group
        v-for="item in stuff"
        :key="item.id"
        :visible="item.visible"
      >
        <l-layer-group :visible="item.markersVisible">
          <l-marker
            v-for="marker in item.markers"
            :key="marker.id"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :lat-lng="marker.position"
            @click="alert(marker)"
          />
        </l-layer-group>
        <l-polyline
          :lat-lngs="item.polyline.points"
          :visible="item.polyline.visible"
          @click="alert(item.polyline)"
        />
      </l-layer-group>
    </l-map>
    <l-map
      :zoom.sync="zoom"
      :center="center"
      :options="option2"
      :bounds="bounds"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      style="height: 45%"
    >
      <l-tile-layer :url="url" :attribution="attribution" :token="token" />
      <l-marker
        v-for="item in markers"
        :key="item.id"
        :lat-lng="item.position"
        :visible="item.visible"
        :draggable="item.draggable"
        @click="alert(item)"
      />
      <l-polyline
        v-for="item in polylines"
        :key="item.id"
        :lat-lngs="item.points"
        :visible="item.visible"
        @click="alert(item)"
      />
      <l-layer-group
        v-for="item in stuff"
        :key="item.id"
        :visible="item.visible"
      >
        <l-layer-group :visible="item.markersVisible">
          <l-marker
            v-for="marker in item.markers"
            :key="marker.id"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :lat-lng="marker.position"
            @click="alert(marker)"
          />
        </l-layer-group>
        <l-polyline
          :lat-lngs="item.polyline.points"
          :visible="item.polyline.visible"
          @click="alert(item.polyline)"
        />
      </l-layer-group>
    </l-map>
  </div>
</template>

<script>
import { latLng, latLngBounds } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LLayerGroup
} from "vue2-leaflet";

var markers1 = [
  {
    position: { lng: -1.219482, lat: 47.41322 },
    visible: true,
    draggable: true
  },
  { position: { lng: -1.571045, lat: 47.457809 } },
  { position: { lng: -1.560059, lat: 47.739323 } },
  { position: { lng: -0.922852, lat: 47.886881 } },
  { position: { lng: -0.769043, lat: 48.231991 } },
  { position: { lng: 0.395508, lat: 48.268569 } },
  { position: { lng: 0.604248, lat: 48.026672 } },
  { position: { lng: 1.2854, lat: 47.982568 } },
  { position: { lng: 1.318359, lat: 47.894248 } },
  { position: { lng: 1.373291, lat: 47.879513 } },
  { position: { lng: 1.384277, lat: 47.798397 } },
  { position: { lng: 1.329346, lat: 47.754098 } },
  { position: { lng: 1.329346, lat: 47.680183 } },
  { position: { lng: 0.999756, lat: 47.635784 } },
  { position: { lng: 0.86792, lat: 47.820532 } },
  { position: { lng: 0.571289, lat: 47.820532 } },
  { position: { lng: 0.439453, lat: 47.717154 } },
  { position: { lng: 0.439453, lat: 47.61357 } },
  { position: { lng: -0.571289, lat: 47.487513 } },
  { position: { lng: -0.615234, lat: 47.680183 } },
  { position: { lng: -0.812988, lat: 47.724545 } },
  { position: { lng: -1.054688, lat: 47.680183 } },
  { position: { lng: -1.219482, lat: 47.41322 } }
];

var poly1 = [
  { lng: -1.219482, lat: 47.41322 },
  { lng: -1.571045, lat: 47.457809 },
  { lng: -1.560059, lat: 47.739323 },
  { lng: -0.922852, lat: 47.886881 },
  { lng: -0.769043, lat: 48.231991 },
  { lng: 0.395508, lat: 48.268569 },
  { lng: 0.604248, lat: 48.026672 },
  { lng: 1.2854, lat: 47.982568 },
  { lng: 1.318359, lat: 47.894248 },
  { lng: 1.373291, lat: 47.879513 },
  { lng: 1.384277, lat: 47.798397 },
  { lng: 1.329346, lat: 47.754098 },
  { lng: 1.329346, lat: 47.680183 },
  { lng: 0.999756, lat: 47.635784 },
  { lng: 0.86792, lat: 47.820532 },
  { lng: 0.571289, lat: 47.820532 },
  { lng: 0.439453, lat: 47.717154 },
  { lng: 0.439453, lat: 47.61357 },
  { lng: -0.571289, lat: 47.487513 },
  { lng: -0.615234, lat: 47.680183 },
  { lng: -0.812988, lat: 47.724545 },
  { lng: -1.054688, lat: 47.680183 },
  { lng: -1.219482, lat: 47.41322 }
];
var corner1 = latLng(40.712, -74.227);
var corner2 = latLng(40.774, -74.125);
export default {
  name: "MultiMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup
  },
  data() {
    return {
      zoom: 13,
      center: { lat: 51.505, lng: -0.09 },
      bounds: latLngBounds(corner1, corner2),
      minZoom: 1,
      maxZoom: 20,
      opacity: 0.6,
      option1: { name: "1" },
      option2: { name: "2" },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      token: "your token if using mapbox",
      markers: [
        {
          id: "m1",
          position: { lat: 51.505, lng: -0.09 },
          draggable: true,
          visible: true
        },
        {
          id: "m2",
          position: { lat: 51.8905, lng: -0.09 },
          draggable: true,
          visible: false
        },
        {
          id: "m3",
          position: { lat: 51.005, lng: -0.09 },
          draggable: true,
          visible: true
        },
        {
          id: "m4",
          position: { lat: 50.7605, lng: -0.09 },
          draggable: true,
          visible: false
        }
      ],
      polylines: [
        {
          id: "p1",
          points: [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: -181.569 },
            { lat: -27.467, lng: -206.973 }
          ],
          visible: true
        },
        {
          id: "p2",
          points: [[-73.91, 40.78], [-87.62, 41.83], [-96.72, 32.76]],
          visible: true
        }
      ],
      stuff: [
        {
          markers: markers1,
          polyline: { points: poly1, visible: true },
          visible: true,
          markersVisible: true
        }
      ]
    };
  },
  methods: {
    alert(item) {
      alert("this is " + JSON.stringify(item));
    }
  }
};
</script>
