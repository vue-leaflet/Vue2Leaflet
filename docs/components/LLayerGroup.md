# LLayerGroup

## Props

| Prop name   | Description | Type    | Values | Default       |
| ----------- | ----------- | ------- | ------ | ------------- |
| pane        |             | string  | -      | 'overlayPane' |
| attribution |             | string  | -      | null          |
| name        |             | string  | -      | undefined     |
| layerType   |             | string  | -      | undefined     |
| visible     |             | boolean | -      | true          |
| options     |             | object  | -      | {}            |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
