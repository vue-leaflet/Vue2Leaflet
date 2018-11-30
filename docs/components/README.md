# Introduction

Vue2Leaflet is a wrapper library for the mapping library [leaflet](https://leafletjs.com)

To easily encapsulate most of the functionality of leaflet a series of composable vue-components are provided.

> The components menu offer a detailed view of each component and a playground to test it.

!> Most of our components do not emit events
but **all** the components pass down listeners for leaflets events.
It's possible to bind to them by simply writing `@leafletEventName`

## Base

* [l-map](/components/l-map/)

## Shapes

* [l-circle](/components/l-circle/)
* [l-polygon](/components/l-polygon/)
* [l-polyline](/components/l-polyline/)
* [l-rectangle](/components/l-rectangle/)

## Tiles

* [l-tile-layer](/components/l-tile-layer/)
* [l-wms-tile-layer](/components/l-wms-tile-layer/)

## Markers

* [l-circle-marker](/components/l-circle-marker/)
* [l-icon](/components/l-icon/)
* [l-marker](/components/l-marker/)

## Controls

* [l-control](/components/l-control/)
* [l-control-attribution](/components/l-control-attribution/)
* [l-control-layers](/components/l-control-layers/)
* [l-control-scale](/components/l-control-scale/)
* [l-control-zoom](/components/l-control-zoom/)

## Info

* [l-popup](/components/l-popup/)
* [l-tooltip](/components/l-tooltip/)

## Grouping

* [l-feature-group](/components/l-feature-group/)
* [l-layer-group](/components/l-layer-group/)

## Other

* [l-geo-json](/components/l-geo-json/)
* [l-image-overlay](/components/l-image-overlay/)