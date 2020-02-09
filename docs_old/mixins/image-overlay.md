### Props

```js
{
  url: {
    type: String,
    custom: true
  },
  bounds: {
    custom: true
  },
  opacity: {
    type: Number,
    custom: true,
    default: 1.0
  },
  alt: {
    type: String,
    default: ''
  },
  interactive: {
    type: Boolean,
    default: false
  },
  crossOrigin: {
    type: Boolean,
    default: false
  },
  errorOverlayUrl: {
    type: String,
    custom: true,
    default: ''
  },
  zIndex: {
    type: Number,
    custom: true,
    default: 1
  },
  className: {
    type: String,
    default: ''
  }
}
```

### Methods

* **getBounds** - call leaflet [getBounds](https://leafletjs.com/reference-1.3.0.html#imageoverlay-getbounds) function
* **getElement** - call leaflet [getElement](https://leafletjs.com/reference-1.3.0.html#imageoverlay-getelement) function
* **bringToFront** - call leaflet [bringToFront](https://leafletjs.com/reference-1.3.0.html#imageoverlay-bringtofront) function
* **bringToBack** - call leaflet [bringToBack](https://leafletjs.com/reference-1.3.0.html#imageoverlay-bringtoback) function


!> Extends [Layer](#Layer) and [InteractiveLayer](#InteractiveLayer)