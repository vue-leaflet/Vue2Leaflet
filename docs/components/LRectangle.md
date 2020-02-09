# LRectangle

## Props

| Prop name           | Description | Type    | Values | Default       |
| ------------------- | ----------- | ------- | ------ | ------------- |
| pane                |             | string  | -      | 'overlayPane' |
| attribution         |             | string  | -      | null          |
| name                |             | string  | -      | undefined     |
| layerType           |             | string  | -      | undefined     |
| visible             |             | boolean | -      | true          |
| interactive         |             | boolean | -      | true          |
| bubblingMouseEvents |             | boolean | -      | true          |
| lStyle              |             | object  | -      | null          |
| stroke              |             | boolean | -      | true          |
| color               |             | string  | -      | '#3388ff'     |
| weight              |             | number  | -      | 3             |
| opacity             |             | number  | -      | 1.0           |
| lineCap             |             | string  | -      | 'round'       |
| lineJoin            |             | string  | -      | 'round'       |
| dashArray           |             | string  | -      | null          |
| dashOffset          |             | string  | -      | null          |
| fill                |             | boolean | -      | true          |
| fillColor           |             | string  | -      | '#3388ff'     |
| fillOpacity         |             | number  | -      | 0.2           |
| fillRule            |             | string  | -      | 'evenodd'     |
| className           |             | string  | -      | null          |
| smoothFactor        |             | number  | -      | 1.0           |
| noClip              |             | boolean | -      | false         |
| options             |             | object  | -      | {}            |
| bounds              |             | array   | -      | () => []      |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |