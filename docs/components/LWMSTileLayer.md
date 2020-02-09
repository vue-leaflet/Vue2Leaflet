# LWMSTileLayer

## Props

| Prop name    | Description | Type    | Values | Default      |
| ------------ | ----------- | ------- | ------ | ------------ |
| pane         |             | string  | -      | 'tilePane'   |
| attribution  |             | string  | -      | null         |
| name         |             | string  | -      | undefined    |
| layerType    |             | string  | -      | undefined    |
| visible      |             | boolean | -      | true         |
| opacity      |             | number  | -      | 1.0          |
| zIndex       |             | number  | -      | 1            |
| tileSize     |             | number  | -      | 256          |
| noWrap       |             | boolean | -      | false        |
| tms          |             | boolean | -      | false        |
| detectRetina |             | boolean | -      | false        |
| layers       |             | string  | -      | ''           |
| styles       |             | string  | -      | ''           |
| format       |             | string  | -      | 'image/jpeg' |
| transparent  |             | boolean | -      |              |
| version      |             | string  | -      | '1.1.1'      |
| crs          |             | object  | -      | null         |
| upperCase    |             | boolean | -      | false        |
| options      |             | object  | -      | {}           |
| baseUrl      |             | string  | -      | null         |

## Events

| Event name     | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| update:visible | boolean | Triggers when the visible prop needs to be updated |
| ready          | object  | Triggers when the component is ready               |
