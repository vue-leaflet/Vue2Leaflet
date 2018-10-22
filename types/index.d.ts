// Type definitions for vue2-leaflet v1.1.0
// Project: https://github.com/KoRiGaN/Vue2Leaflet/
// Definitions by: Matthew Meehan <https://github.com/HIMISOCOOL>

/**
 * TODO: 
 * create test cases for types
 * type parentContainer in components
 * type findRealParent
 * replace all misc any types with proper types
 */

declare module "vue2-leaflet" {
  import Vue from "vue";
  import { PropsDefinition } from "vue/types/options";
  // borrowed from https://github.com/vuejs/vue-class-component
  type VueClass<V> = {
    new (...args: any[]): V & Vue;
  } & typeof Vue;
  function Mixins<A>(CtorA: VueClass<A>): VueClass<A>;
  function Mixins<A, B>(
    CtorA: VueClass<A>,
    CtorB: VueClass<B>
  ): VueClass<A & B>;
  function Mixins<A, B, C>(
    CtorA: VueClass<A>,
    CtorB: VueClass<B>,
    CtorC: VueClass<C>
  ): VueClass<A & B & C>;
  function Mixins<A, B, C, D>(
    CtorA: VueClass<A>,
    CtorB: VueClass<B>,
    CtorC: VueClass<C>,
    CtorD: VueClass<D>
  ): VueClass<A & B & C & D>;
  function Mixins<A, B, C, D, E>(
    CtorA: VueClass<A>,
    CtorB: VueClass<B>,
    CtorC: VueClass<C>,
    CtorD: VueClass<D>,
    CtorE: VueClass<E>
  ): VueClass<A & B & C & D & E>;
  function Mixins<T>(...Ctors: VueClass<Vue>[]): VueClass<T>;

  // Mixins
  class Circle extends Mixins(Path) {
    /**
     * @default null
     */
    radius: number | null;
  }
  class Control extends Vue {
    position: "topleft" | "topright" | "bottomleft" | "bottomright";
    options: L.ControlOptions;
  }
  class GridLayer extends Mixins(Layer) {
    /**
     * @default 'tilePane'
     */
    pane: string;
    /**
     * @default 1.0
     */
    opacity: number;
    /**
     * @default 1
     */
    zIndex: number;
  }
  class ImageOverlay extends Mixins(Layer) {
    // props
    url: string;
    /**
     * @default true
     */
    bounds: boolean;
    /**
     * @default 1.0
     */
    opacity: number;
    /**
     * @default ''
     */
    alt: string;
    /**
     * @default false
     */
    interactive: boolean;
    /**
     * @default false
     */
    crossOrigin: boolean;
    /**
     * @default ''
     */
    errorOverlayUrl: string;
    /**
     * @default 1
     */
    zIndex: number;
    /**
     * @default ''
     */
    className: string;
    // methods
    setOpacity(opacity: number): any;
    setUrl(url: string): any;
    setBounds(bounds: any): any;
    getBounds(): any;
    getElement(): any;
    bringToFront(): any;
    bringToBack(): any;
  }
  class InteractiveLayer extends Vue {
    /**
     * @default true
     */
    interactive: boolean;
    /**
     * @default true
     */
    bubblingMouseEvents: boolean;
  }
  class Layer extends Vue {
    // props
    /**
     * @default 'overlayPane'
     */
    pane: string;
    /**
     * @default null
     */
    attribution: string | null;
    /**
     * @default null
     */
    name: string | null;
    /**
     * @default true
     */
    visible: boolean;

    // methods
    setAttribution(val: string | null, old?: string | null): void;
    setName(newVal: string | null, oldVal?: string | null): void;
    setVisible(newVal: boolean, oldVal?: boolean): void;
  }
  class LayerGroup extends Mixins(Layer) {
    // props
    /**
     * @default null
     */
    layerType: string | null;
    // methods
    addLayer(layer: any, alreadyAdded?: boolean): void;
    removeLayer(layer: any, alreadyRemoved?: boolean): void;
    setLayerType(newVal: string | null, oldVal?: string | null): void;
  }
  class Path extends Mixins(Layer, InteractiveLayer) {
    // props
    /**
     * @default null
     */
    lStyle: object | null;
    /**
     * @default true
     */
    stroke: boolean;
    /**
     * @default '#3388ff'
     */
    color: string;
    /**
     * @default 3
     */
    weight: number;
    /**
     * @default 1.0
     */
    opacity: number;
    /**
     * @default 'round'
     */
    lineCap: string;
    /**
     * @default 'round'
     */
    lineJoin: string;
    /**
     * @default null
     */
    dashArray: string | null;
    /**
     * @default null
     */
    dashOffset: string | null;
    /**
     * @default true
     */
    fill: boolean;
    /**
     * @default '#3388ff'
     */
    fillColor: string;
    /**
     * @default 0.2
     */
    fillOpacity: number;
    /**
     * @default 'evenodd'
     */
    fillRule: string;
    /**
     * @default null
     */
    className: string | null;

    // methods
    setStroke(newVal: boolean, oldVal?: boolean): void;
    setWeight(newVal: number, oldVal?: number): void;
    setOpacity(newVal: number, oldVal?: number): void;
    setLineCap(newVal: string, oldVal?: string): void;
    setLineJoin(newVal: string, oldVal?: string): void;
    setDashArray(newVal: string | null, oldVal?: string | null): void;
    setDashOffset(newVal: string | null, oldVal?: string | null): void;
    setFill(newVal: boolean, oldVal?: boolean): void;
    setFillOpacity(newVal: number, oldVal?: number): void;
    setFillRule(newVal: string, oldVal?: string): void;
    setClassName(newVal: string | null, oldVal?: string | null): void;
  }
  class Polygon extends Mixins(PolyLine) {
    getGeoJSONData(): any;
  }
  class PolyLine extends Mixins(Path) {
    // props
    /**
     * @default 1.0
     */
    smoothFactor: number;
    /**
     * @default false
     */
    noClip: boolean;
    // methods
    setLStyle(newVal: object, oldVal?: object): void;
    setSmoothFactor(newVal: number, oldVal?: number): void;
    setNoClip(newVal: boolean, oldVal?: boolean): void;
    addLatLng(value: any): void;
  }
  class Popper extends Vue {
    // props
    /**
     * @default ''
     */
    content: string;
    /**
     * @default {}
     */
    options: any;
    /**
     * @default false
     */
    dynamic: boolean;
    // data
    ready: boolean;
    // methods
    setContent(): void;
  }
  class TileLayer extends Mixins(GridLayer) {
    // props
    /**
     * @default false
     */
    tms: boolean;
    /**
     * @default false
     */
    detectRetina: boolean;
    /**
     * @default {}
     */
    options: L.TileLayerOptions;
    layerType?: string;
  }
  class TileLayerWMS extends Mixins(TileLayer) {
    /**
     * @default ''
     */
    layers: string;
    /**
     * @default ''
     */
    styles: string;
    /**
     * @default 'image/jpeg'
     */
    format: string;
    transparent?: boolean;
    /**
     * @default '1.1.1'
     */
    version: string;
    /**
     * @default null
     */
    crs: any;
    /**
     * @default false
     */
    upperCase: boolean;
  }

  // components
  class LCircle extends Mixins(Circle) {
    // props
    /**
     * @default []
     */
    latLng: L.LatLngExpression;
    // data
    ready: boolean;
    mapObject: L.Circle;
    parentContainer: any;
  }
  class LCircleMarker extends Mixins(Circle) {
    // props
    /**
     * @default []
     */
    latLng: L.LatLngExpression;
    // data
    ready: boolean;
    mapObject: L.CircleMarker;
    parentContainer: any;
  }
  class LControl extends Mixins(Control) {
    mapObject: L.Control & {
      element?: HTMLElement;
      onAdd(): HTMLElement;
      setElement(el: HTMLElement): void;
    };
    parentContainer: any;
  }
  class LControlAttribution extends Mixins(Control) {
    /**
     * @default null
     */
    prefix: string | null;
    mapObject: L.Control.Attribution;
  }
  class LControlLayers extends Mixins(Control) {
    // Props
    /**
     * @default true
     */
    collapsed: boolean;
    /**
     * @default true
     */
    autoZIndex: boolean;
    /**
     * @default false
     */
    hideSingleBase: boolean;
    /**
     * @default false
     */
    sortLayers: boolean;
    sortFunction?: Function;

    // data
    mapObject: L.Control.Layers;

    // methods
    addLayer(layer: any): void;
    removeLayer(layer: any): void;
  }
  class LControlScale extends Mixins(Control) {
    // props
    /**
     * @default 100
     */
    maxWidth: number;
    /**
     * @default true
     */
    metric: boolean;
    /**
     * @default true
     */
    imperial: boolean;
    /**
     * @default false
     */
    updateWhenIdle: boolean;

    // data
    mapObject: L.Control.Scale;
  }
  class LControlZoom extends Mixins(Control) {
    // props
    /**
     * @default '+'
     */
    zoomInText: string;
    /**
     * @default 'Zoom in'
     */
    zoomInTitle: string;
    /**
     * @default '-'
     */
    zoomOutText: string;
    /**
     * @default 'Zoom out'
     */
    zoomOutTitle: string;

    // data
    mapObject: L.Control.Zoom;
  }
  class LFeatureGroup extends Mixins(LayerGroup) {
    // data
    ready: boolean;
    mapObject: L.FeatureGroup;
    parentContainer: any;
  }
  class LGeoJson extends Mixins(LayerGroup) {
    // props
    /**
     * @default {}
     */
    geojson: object | any[];
    /**
     * @default {}
     */
    options: L.GeoJSONOptions;
    /**
     * @default null
     */
    optionsStyle: object | Function | null;

    // computed
    mergedOptions: Record<string, any>;

    // data
    mapObject: L.GeoJSON;
    parentContainer: any;

    // methods
    setGeojson(newVal: any): void;
    getGeoJSONData(): any;
    getBounds(): any;
    setOptions(newVal: any, oldVal?: any): void;
    setOptionsStyle(
      newVal: object | Function | null,
      oldVal?: object | Function | null
    ): void;
  }
  class LIconDefault extends Vue {
    // props
    /**
     * @default ''
     */
    imagePath: string;

    // methods
    setImagePath(newVal: string, oldVal?: string): void;
  }
  class LImageOverlay extends Mixins(ImageOverlay) {
    mapObject: L.ImageOverlay;
    parentContainer: any;
  }
  class LLayerGroup extends LayerGroup {
    ready: boolean;
    mapObject: L.LayerGroup;
    parentContainer: any;
  }
  class LMap extends Vue {
    // props
    /**
     * @default [0, 0]
     */
    center: L.LatLngExpression;
    /**
     * @default null
     */
    bounds: any[] | {} | null;
    /**
     * @default null
     */
    maxBounds: any[] | {} | null;
    /**
     * @default 0
     */
    zoom: number;
    /**
     * @default: null
     */
    minZoom: number | null;
    /**
     * @default: null
     */
    maxZoom: number | null;
    /**
     * @default null
     */
    paddingBottomRight: any[] | null;
    /**
     * @default null
     */
    paddingTopLeft: any[] | null;
    /**
     * @default null
     */
    padding: any[] | null;
    /**
     * @default false
     */
    worldCopyJump: boolean;
    /**
     * @default L.CRS.EPSG3857
     */
    crs: L.CRS;
    /**
     * @default null
     */
    maxBoundsViscosity: number | null;
    /**
     * @default {}
     */
    options: L.MapOptions;
    // data
    ready: boolean;
    lastSetCenter: L.LatLng | null;
    lastSetBounds: any | null;
    lastSetZoom: any | null;
    layerControl?: any;
    layersToAdd: any[];
    mapObject: L.Map;
    // methods
    registerLayerControl(lControlLayers: any): void;

    addLayer(layer: any, alreadyAdded?: boolean): void;

    removeLayer(layer: any, alreadyRemoved?: boolean): void;

    setZoom(newVal: number, oldVal?: number): void;

    setCenter(newVal: L.LatLngExpression, oldVal?: L.LatLngExpression): void;

    setBounds(
      newVal: L.LatLngBoundsExpression,
      oldVal?: L.LatLngBoundsExpression
    ): void;

    setPaddingBottomRight(newVal: any[], oldVal?: any[]): void;

    setPaddingTopLeft(newVal: any[], oldVal?: any[]): void;

    setPadding(newVal: any[], oldVal?: any[]): void;

    fitBounds(bounds: any): void;

    moveEndHandler(): void;
  }
  class LMarker extends Mixins(Layer) {
    // props
    /**
     * @default 'markerPane'
     */
    pane: string;
    /**
     * @default false
     */
    draggable: boolean;
    /**
     * @default null
     */
    latLng: L.LatLngExpression | null;
    /**
     * @default new L.Icon.Default()
     */
    icon: L.Icon;
    /**
     * @default null
     */
    zIndexOffset: number | null;
    /**
     * @default {}
     */
    options: L.MarkerOptions;

    // data
    ready: boolean;
    mapObject: L.Marker;
    parentContainer: any;

    // methods
    setDraggable(newVal: boolean, oldVal?: boolean): void;
    setLatLng(newVal: L.LatLngExpression): void;
  }
  class LPolygon extends Mixins(Polygon) {
    // props
    /**
     * @default []
     */
    latLongs: L.LatLngExpression[];

    // data
    ready: boolean;
    mapObject: L.Polygon;
    parentContainer: any;
  }
  class LPolyline extends Mixins(PolyLine) {
    // props
    /**
     * @default []
     */
    latLongs: L.LatLngExpression[];

    // data
    ready: boolean;
    mapObject: L.Polyline;
    parentContainer: any;
  }
  class LPopup extends Mixins(Popper) {
    // props
    /**
     * @default []
     */
    latLng: L.LatLngExpression;

    // data
    mapObject: L.Popup;
    parentContainer: any;
  }
  class LRectangle extends Mixins(Polygon) {
    // props
    /**
     * @default []
     */
    bounds: any[];

    // data
    ready: boolean;
    mapObject: L.Rectangle;
    parentContainer: any;
  }
  class LTileLayer extends Mixins(TileLayer) {
    // props
    /**
     * @default null
     */

    url: string | null;
    /**
     * @default L.tileLayer
     */
    tileLayerClass: Function;

    // data
    mapObject: L.TileLayer;
    parentContainer: any;
  }
  class LTooltip extends Mixins(Popper) {
    // data
    mapObject: L.Tooltip;
    parentContainer: any;
  }
  class LWMSTileLayer extends Mixins(TileLayerWMS) {
    // props
    /**
     * @default null
     */
    baseUrl: string | null;

    // data
    mapObject: L.TileLayer.WMS;
    parentContainer: any;
  }

  // utils
  function findRealParent(firstVueParent: Vue): any;
  function propsBinder(
    vueElement: Vue,
    leafletElement: L.Map,
    props: PropsDefinition<Record<string, any>>,
    options?: any
  ): void;

  export {
    findRealParent,
    propsBinder,
    LCircle,
    LCircleMarker,
    LControl,
    LControlAttribution,
    LControlLayers,
    LControlScale,
    LControlZoom,
    LFeatureGroup,
    LGeoJson,
    LIconDefault,
    LImageOverlay,
    LLayerGroup,
    LMap,
    LMarker,
    LPolygon,
    LPolyline,
    LPopup,
    LRectangle,
    LTileLayer,
    LTooltip,
    LWMSTileLayer
  };
}
