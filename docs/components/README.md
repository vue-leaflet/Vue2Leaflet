---
sidebarDepth: 2
---

# Introduction

Vue2Leaflet is a wrapper library for the mapping library [leaflet](https://leafletjs.com)

To easily encapsulate most of the functionality of leaflet a series of composable vue-components are provided.

::: tip
Most of our components do not emit events
but **all** the components pass down listeners for leaflets events.
It's possible to bind to them by simply writing `@leafletEventName`
:::

## Base

- [l-map](/components/LMap.md)

## Shapes

- [l-circle](/components/LCircle.md)

- [l-polygon](/components/LPolygon.md)

- [l-polyline](/components/LPolyline.md)

- [l-rectangle](/components/LRectangle.md)

## Tiles

- [l-grid-layer](/components/LGridLayer.md)

- [l-tile-layer](/components/LTileLayer.md)

- [l-wms-tile-layer](/components/LWmsTileLayer.md)

## Markers

- [l-circle-marker](/components/LCircleMarker.md)

- [l-icon-default](/components/LIconDefault.md)

- [l-icon](/components/LIcon.md)

- [l-marker](/components/LMarker.md)

## Controls

- [l-control](/components/LControl.md)

- [l-control-attribution](/components/LControlAttribution.md)

- [l-control-layers](/components/LControlLayers.md)

- [l-control-scale](/components/LControlScale.md)

- [l-control-zoom](/components/LControlZoom.md)

## Info

- [l-popup](/components/LPopup.md)

- [l-tooltip](/components/LTooltip.md)

## Grouping

- [l-feature-group](/components/LFeatureGroup.md)

- [l-layer-group](/components/LLayerGroup.md)

## Other

- [l-geo-json](/components/LGeoJson.md)

- [l-image-overlay](/components/LImageOverlay.md)
