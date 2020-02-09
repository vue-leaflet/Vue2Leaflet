# LImageOverlay

## Props

| Prop name           | Description | Type    | Values | Default       |
| ------------------- | ----------- | ------- | ------ | ------------- |
| pane                |             | string  | -      | 'overlayPane' |
| attribution         |             | string  | -      | null          |
| name                |             | string  | -      | undefined     |
| layerType           |             | string  | -      | undefined     |
| visible             |             | boolean | -      | true          |
| interactive         |             | boolean | -      | false         |
| bubblingMouseEvents |             | boolean | -      | true          |
| url                 |             | string  | -      |               |
| bounds              |             |         | -      |               |
| opacity             |             | number  | -      | 1.0           |
| alt                 |             | string  | -      | ''            |
| crossOrigin         |             | boolean | -      | false         |
| errorOverlayUrl     |             | string  | -      | ''            |
| zIndex              |             | number  | -      | 1             |
| className           |             | string  | -      | ''            |
| options             |             | object  | -      | {}            |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
