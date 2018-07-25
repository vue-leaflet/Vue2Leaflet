<template>
  <div>
    <ul id="side">
      <li>
        <a
          href="#"
          @click="currentView='simple'">Simple map</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='marker-popup-example'">Custom Component</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='multi-map'">Two maps</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='custom-path'">Custom path</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='custom-url-params'">Custom Url Params</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='set-bounds'">Set bounds</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='example'">Some examples</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='geometry-test'">Geometry</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='popup-on-geometry-test'">Popup on Geometry</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='world-copy-jump'">Jump on World Copy</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='geo-json'">GeoJSON</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='geo-json2'">GeoJSON 2</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='wms-layers'">WMS Tile Layers</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='crs'">CRS and Image Overlay</a>
      </li>
      <li>
        <a
          href="#"
          @click="currentView='stress'">Load Test</a>
      </li>
    </ul>
    <component
      id="full_div"
      :is="currentView"/>
  </div>
</template>

<script>
import CRSAndImageOverlay from './components/CRSAndImageOverlay';
import CustomPath from './components/CustomPath';
import CustomUrlParams from './components/CustomUrlParams';
import Example from './components/Example';
import GeoJSON from './components/GeoJSON';
import GeoJSON2 from './components/GeoJSON2';
import GeometryTest from './components/GeometryTest';
import MarkerPopupExample from './components/MarkerPopupExample';
import MultiMap from './components/MultiMap';
import PopupOnGeometryTest from './components/PopupOnGeometryTest';
import SetBounds from './components/SetBounds';
import Simple from './components/Simple';
import WMSLayers from './components/WMSLayers';
import WorldCopyJump from './components/WorldCopyJump';
import LoadTest from './components/LoadTest';

export default {
  name: 'App',
  components: {
    CustomPath,
    CustomUrlParams,
    Example,
    GeometryTest,
    MarkerPopupExample,
    MultiMap,
    PopupOnGeometryTest,
    SetBounds,
    Simple,
    WorldCopyJump,
    'geo-json': GeoJSON,
    'geo-json2': GeoJSON2,
    'wms-layers': WMSLayers,
    'crs': CRSAndImageOverlay,
    stress: LoadTest
  },
  data () {
    return {
      currentView: 'stress'
    };
  }
};
</script>

<style>
.leaflet-fake-icon-image-2x {
  background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
}
.leaflet-fake-icon-shadow {
  background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
}
@import "../../node_modules/leaflet/dist/leaflet.css";

body {
  margin: 0px;
  font-family: Helvetica, Verdana, sans-serif;
}

#side {
  float:left;
  width:208px;
}

#full_div {
  position: absolute;
  overflow-x: auto;
  top: 0;
  right: 0;
  left: 208px;
  bottom: 0;
  padding-left: 8px;
  border-left: 1px solid #ccc;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  font: 200 15px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border: none;
}

li a {
  font-size: 15px;
  padding-left: 8px;
  text-decoration: none;
  color: #000;
  display: block;

  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

li a:hover {
  font-size: 20px;
  background: #f6f6f6;
}
</style>
