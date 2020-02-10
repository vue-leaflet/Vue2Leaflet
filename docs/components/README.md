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

- [l-map](/components/LMap)

## Shapes

- [l-circle](/components/LCircle)

- [l-polygon](/components/LPolygon)

- [l-polyline](/components/LPolyline)

- [l-rectangle](/components/LRectangle)

## Tiles

- [l-grid-layer](/components/LGridLayer)

- [l-tile-layer](/components/LTileLayer)

- [l-wms-tile-layer](/components/LWmsTileLayer)

## Markers

- [l-circle-marker](/components/LCircleMarker)

- [l-icon-default](/components/LIconDefault)

- [l-icon](/components/LIcon)

- [l-marker](/components/LMarker)

## Controls

- [l-control](/components/LControl)

- [l-control-attribution](/components/LControlAttribution)

- [l-control-layers](/components/LControlLayers)

- [l-control-scale](/components/LControlScale)

- [l-control-zoom](/components/LControlZoom)

## Info

- [l-popup](/components/LPopup)

- [l-tooltip](/components/LTooltip)

## Grouping

- [l-feature-group](/components/LFeatureGroup)

- [l-layer-group](/components/LLayerGroup)

## Other

- [l-geo-json](/components/LGeoJson)

- [l-image-overlay](/components/LImageOverlay)
