<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>GeoJSON example as this <a href="http://leafletjs.com/examples/geojson/">example</a></h3>
    </div>
    <l-map style="height: 90%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-geo-json :geojson="bus.geojson" :options="bus.options"></l-geo-json>
      <l-geo-json :geojson="bicycleAndCampus.geojson" :options="bicycleAndCampus.options"></l-geo-json>
      <l-geo-json :geojson="coors.geojson" :options="coors.options"></l-geo-json>
    </l-map>
      <div id='bla'></div>
  </div>
</template>

<script>
import Vue from 'vue';
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet';
import PopupContent from './PopupContent';

import { default as data } from '../assets/geojson/sample-geojson.js';

var baseballIcon = L.icon({
  iconUrl: 'static/images/baseball-marker.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28]
});

function onEachFeature(feature, layer) {
  let popupContent = Vue.extend(PopupContent);
  let popup = new popupContent({ propsData: { data: { type: feature.type, color: 'blue'}}});
  layer.bindPopup(popup.$mount().$el);
}

export default {
  name: 'example',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data () {
    return {
      zoom: 13,
      center: [39.74739, -105],
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      bus: {
        geojson: data.freeBus,
        options: {
          filter: function (feature, layer) {
            if (feature.properties) {
              return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
            }
            return false;
          },
          onEachFeature: onEachFeature
        }
      },
      coors: {
        geojson: data.coorsField,
        options: {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: baseballIcon});
          },
          onEachFeature: onEachFeature
        }
      },
      bicycleAndCampus: {
        geojson: [ data.bicycleRental, data.campus ],
        options: {
          style: function (feature) {
            return feature.properties && feature.properties.style;
          },
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: 8,
              fillColor: "#ff7800",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          }
        }
      }
    }
  },
}
</script>
