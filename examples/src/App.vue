<template>
  <div id="app">
    <div id="side">
      <li>
        <a href="#" @click="currentView='simple'">Simple map</a>
      </li>
      <li>
        <a href="#" @click="currentView='multi-map'">Two maps</a>
      </li>
      <li>
        <a href="#" @click="currentView='custom-path'">Custom path</a>
      </li>
      <li>
        <a href="#" @click="currentView='example'">Some examples</a>
      </li>
    </div>
    <div class="container">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2Leaflet from 'vue2-leaflet';
import Simple from './components/Simple'
import Example from './components/Example'
import MultiMap from './components/MultiMap'
import CustomPath from './components/CustomPath'

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-poly', Vue2Leaflet.Polyline);
Vue.component('v-group', Vue2Leaflet.LayerGroup);
Vue.component('v-tooltip', Vue2Leaflet.Tooltip);
Vue.component('v-popup', Vue2Leaflet.Popup);
Vue.component('v-icondefault', Vue2Leaflet.IconDefault);

export default {
  name: 'app',
  components: {
    Simple,
    Example,
    MultiMap,
    CustomPath
  },
  data () {
    return {
      currentView: 'simple'
    }
  }
}
</script>

<style lang='scss'>
.leaflet-fake-icon-image-2x {
  background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
}
.leaflet-fake-icon-shadow {
  background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
}
@import "../../node_modules/leaflet/dist/leaflet.css";

#app {
}

#side {
  float:left;
  width:200px;
}

#container {
  margin: 0 0 0 200px;
}
#top_div {
  position: absolute;
  top: 0;
  right: 0;
  left: 200px;
  bottom: 50%;
}

#bottom_div {
  position: absolute;
  top: 50%;
  right: 0;
  left: 200px;
  bottom: 0;
}
</style>
