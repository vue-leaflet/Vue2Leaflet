import Vue from 'vue'
import App from './App'

L.Icon.Default.imagePath = "/images/";

new Vue({
  el: '#main',
  template: '<App/>',
  components: { App }
});
