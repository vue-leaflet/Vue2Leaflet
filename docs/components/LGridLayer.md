# LGridLayer

## Props

| Prop name     | Description | Type    | Values | Default    |
| ------------- | ----------- | ------- | ------ | ---------- |
| pane          |             | string  | -      | 'tilePane' |
| attribution   |             | string  | -      | null       |
| name          |             | string  | -      | undefined  |
| layerType     |             | string  | -      | undefined  |
| visible       |             | boolean | -      | true       |
| opacity       |             | number  | -      | 1.0        |
| zIndex        |             | number  | -      | 1          |
| tileSize      |             | number  | -      | 256        |
| noWrap        |             | boolean | -      | false      |
| options       |             | object  | -      | {}         |
| tileComponent |             | object  | -      |            |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
