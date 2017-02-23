<template>
  <div>
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
        <a href="#" @click="currentView='set-bounds'">Set bounds</a>
      </li>
      <li>
        <a href="#" @click="currentView='example'">Some examples</a>
      </li>
      <li>
        <a href="#" @click="currentView='circle-test'">Circle</a>
      </li>
      <li>
        <a href="#" @click="currentView='world-copy-jump'">Jump on World Copy</a>
      </li>
    </div>
    <div class="container">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>

import Simple from './components/Simple'
import Example from './components/Example'
import MultiMap from './components/MultiMap'
import CustomPath from './components/CustomPath'
import SetBounds from './components/SetBounds'
import CircleTest from './components/CircleTest'
import WorldCopyJump from './components/WorldCopyJump'

export default {
  name: 'app',
  components: {
    Simple,
    Example,
    MultiMap,
    CustomPath,
    SetBounds,
    CircleTest,
    WorldCopyJump
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

#side {
  float:left;
  width:200px;
}

#container {
  margin: 0 0 0 200px;
}
#top_div {
  position: absolute;
  overflow-x: auto;
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
