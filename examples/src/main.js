import Vue from 'vue'
import App from './App'
import L from 'leaflet';

L.Icon.Default.imagePath = "/images/";

new Vue({
  el: '#main',
  template: '<App/>',
  components: { App }
});
