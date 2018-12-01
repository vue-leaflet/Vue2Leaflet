### Props

```js
{
  layers: {
    type: String,
    default: ''
  },
  styles: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    default: 'image/jpeg'
  },
  transparent: {
    type: Boolean,
    custom: false
  },
  version: {
    type: String,
    default: '1.1.1'
  },
  crs: {
    default: null
  },
  upperCase: {
    type: Boolean,
    default: false
  }
}
```

!> Extends [TileLayer](#TileLayer)