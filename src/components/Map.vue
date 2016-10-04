<template>
	<div class="map-container">
		<div class="map-container">
			<div id="map"></div>
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import _ from 'lodash';
import Vue from 'vue'
import L from 'leaflet';

export default {
	props:['center','zoom','minZoom','maxZoom'],
	mounted() {
		L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';
		this.mapObject = L.map('map', {
			center:this.center,
			zoom:this.zoom,
			minZoom:this.minZoom,
			maxZoom:this.maxZoom,
		});
		var that = this.mapObject;
		_.forEach(this.$children, (child) => {
			child.deferredMountedTo(that);
		});
	},
}
</script>

<style type="text/css">
	#map {
		height: 100%;
		width: 100%;
	}
	.map-container {
		height: 100%;
		width: 100%;
	}
</style>
