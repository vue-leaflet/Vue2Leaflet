# LGeoJson

## Props

| Prop name    | Description | Type          | Values | Default       |
| ------------ | ----------- | ------------- | ------ | ------------- |
| pane         |             | string        | -      | 'overlayPane' |
| attribution  |             | string        | -      | null          |
| name         |             | string        | -      | undefined     |
| layerType    |             | string        | -      | undefined     |
| visible      |             | boolean       | -      | true          |
| options      |             | object        | -      | {}            |
| geojson      |             | object\|array | -      | {}            |
| optionsStyle |             | object\|func  | -      | null          |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
