# LMarker

## Props

| Prop name    | Description | Type          | Values | Default                  |
| ------------ | ----------- | ------------- | ------ | ------------------------ |
| pane         |             | string        | -      | 'markerPane'             |
| attribution  |             | string        | -      | null                     |
| name         |             | string        | -      | undefined                |
| layerType    |             | string        | -      | undefined                |
| visible      |             | boolean       | -      | true                     |
| options      |             | object        | -      | {}                       |
| draggable    |             | boolean       | -      | false                    |
| latLng       |             | object\|array | -      | null                     |
| icon         |             | object        | -      | () => new Icon.Default() |
| zIndexOffset |             | number        | -      | null                     |

## Events

| Event name     | Type      | Description                                        |
| -------------- | --------- | -------------------------------------------------- |
| update:visible | boolean   | Triggers when the visible prop needs to be updated |
| ready          | object    | Triggers when the component is ready               |
| update:latLng  | undefined |
| update:lat-lng | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
