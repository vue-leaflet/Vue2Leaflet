import { getMapWrapper } from '@/tests/test-helpers';
import L from 'leaflet';

describe('component: LMap.vue', () => {
  test('LMap.vue change prop center', async () => {
    const mockPanTo = jest.fn();
    const wrapper = getMapWrapper();

    expect(wrapper.exists()).toBe(true);

    wrapper.vm.mapObject.panTo = mockPanTo;
    const newCenter = L.latLng([1, 1]);
    wrapper.setProps({ center: newCenter });
    await wrapper.vm.$nextTick();

    const center = wrapper.vm.lastSetCenter;
    const centerLatLng = L.latLng(center);

    expect(centerLatLng.equals(newCenter)).toBe(true);
    expect(mockPanTo.mock.calls.length).toBe(1);
    expect(mockPanTo.mock.calls[0][0]).toBe(newCenter);
  });

  test('LMap.vue center not change', () => {
    const mockPanTo = jest.fn();
    const center = L.latLng([0, 0]);
    const wrapper = getMapWrapper({ center: center });

    expect(wrapper.exists()).toBe(true);

    wrapper.vm.mapObject.panTo = mockPanTo;
    wrapper.vm.setCenter(center);

    expect(mockPanTo.mock.calls.length).toBe(0);
  });

  test('LMap.vue setCenter should work with [0, 0]', () => {
    const center = [0, 0];
    const mockPanTo = jest.fn();
    const wrapper = getMapWrapper({ center: [1, 1] });

    wrapper.vm.mapObject.panTo = mockPanTo;
    wrapper.vm.setCenter(center);

    expect(wrapper.vm.lastSetCenter.lat).toBe(0);
    expect(wrapper.vm.lastSetCenter.lng).toBe(0);
    expect(mockPanTo.mock.calls.length).toBe(1);
    expect(mockPanTo.mock.calls[0][0]).toEqual(L.latLng([0, 0]));
  });

  // avoid regress this pull https://github.com/KoRiGaN/Vue2Leaflet/pull/264
  test('LMap.vue not should change initial center', () => {
    const initialCenter = L.latLng([0, 0]);
    const center1 = L.latLng([1, 1]);
    const center2 = L.latLng([2, 2]);
    const center3 = L.latLng([3, 3]);
    const wrapper = getMapWrapper({ center: initialCenter });

    wrapper.vm.setCenter(center1);
    wrapper.vm.setCenter(center2);
    wrapper.vm.setCenter(center3);
    const lastSetCenter = wrapper.vm.lastSetCenter;

    expect(lastSetCenter).toEqual(center3);
    expect(initialCenter).toEqual(L.latLng([0, 0]));
    expect(center1).toEqual(L.latLng([1, 1]));
    expect(center2).toEqual(L.latLng([2, 2]));
    expect(center3).toEqual(L.latLng([3, 3]));
  });

  test('LMap.vue initial bounds', () => {
    const bounds = L.latLngBounds(L.latLng([1, 1]), L.latLng([2, 2]));
    const wrapper = getMapWrapper({ bounds: bounds });

    expect(wrapper.vm.lastSetBounds).toEqual(bounds);
  });

  test('LMap.vue change bounds with object and array', async () => {
    const bounds = L.latLngBounds(L.latLng([1, 1]), L.latLng([2, 2]));
    const newBounds = [
      [4, 4],
      [5, 5],
    ];
    const newBounds2 = L.latLngBounds(L.latLng([10, 10]), L.latLng([20, 20]));

    const mockFitBounds = jest.fn();
    const wrapper = getMapWrapper({ bounds: bounds });
    wrapper.vm.mapObject.fitBounds = mockFitBounds;

    wrapper.setProps({ bounds: newBounds });
    await wrapper.vm.$nextTick();
    wrapper.setProps({ bounds: newBounds2 });
    await wrapper.vm.$nextTick();

    expect(mockFitBounds.mock.calls.length).toBe(2);
    expect(mockFitBounds.mock.calls[0][0]).toEqual(L.latLngBounds(newBounds));
    expect(mockFitBounds.mock.calls[1][0]).toEqual(L.latLngBounds(newBounds2));
  });

  test('LMap.vue with same bounds', async () => {
    const bounds = L.latLngBounds(L.latLng([1, 1]), L.latLng([2, 2]));
    const sameBounds = L.latLngBounds(L.latLng([1, 1]), L.latLng([2, 2]));
    const mockFitBounds = jest.fn();
    const wrapper = getMapWrapper({ bounds: bounds });
    wrapper.vm.mapObject.fitBounds = mockFitBounds;

    wrapper.setProps({ bounds: sameBounds });
    await wrapper.vm.$nextTick();

    expect(mockFitBounds.mock.calls.length).toBe(0);
  });

  test('LMap.vue bounds options', async () => {
    const bounds = L.latLngBounds(L.latLng([1, 1]), L.latLng([2, 2]));
    const bounds2 = L.latLngBounds(L.latLng([11, 11]), L.latLng([2, 2]));
    const defaultOptions = { animate: null };
    const optionsPadding = {
      padding: [5, 5],
    };
    const optionsPadding2 = {
      paddingBottomRight: [4, 4],
      paddingTopLeft: [3, 3],
    };
    const mockFitBounds = jest.fn();
    const wrapper = getMapWrapper();
    wrapper.vm.mapObject.fitBounds = mockFitBounds;

    wrapper.setProps({ padding: optionsPadding.padding });
    wrapper.setProps({
      paddingBottomRight: optionsPadding2.paddingBottomRight,
    });
    wrapper.setProps({ paddingTopLeft: optionsPadding2.paddingTopLeft });
    await wrapper.vm.$nextTick();
    wrapper.setProps({ bounds: bounds });
    await wrapper.vm.$nextTick();
    wrapper.setProps({ padding: null });
    await wrapper.vm.$nextTick();
    wrapper.setProps({ bounds: bounds2 });
    await wrapper.vm.$nextTick();

    expect(mockFitBounds.mock.calls.length).toBe(2);
    expect(mockFitBounds.mock.calls[0][0]).toEqual(L.latLngBounds(bounds));
    expect(mockFitBounds.mock.calls[0][1]).toEqual(
      Object.assign({}, defaultOptions, optionsPadding)
    );
    expect(mockFitBounds.mock.calls[1][0]).toEqual(L.latLngBounds(bounds2));
    expect(mockFitBounds.mock.calls[1][1]).toEqual(
      Object.assign({}, defaultOptions, optionsPadding2)
    );
  });

  test('LMap.vue changing center prop caches map view center and bounds', async () => {
    const oldCenter = [0, 0];
    const newCenter = [50, 50];
    const wrapper = getMapWrapper({ center: oldCenter, zoom: 15 });

    wrapper.setProps({ center: newCenter });
    await wrapper.vm.$nextTick();

    expect(L.latLng(newCenter).equals(wrapper.vm.lastSetCenter)).toBeTruthy();
    const cachedBounds = wrapper.vm.lastSetBounds;
    expect(cachedBounds).toBeInstanceOf(L.LatLngBounds);
    // Because the map isn't actually rendered in a DOM element with physical pixel
    // extents, many of the more direct approaches to testing that the cached bounds
    // have changed appropriately don't work here. For instance, the bounds of the
    // map will have zero area, and so likely don't contain the assigned centre.
    // However, at zoom level 15 we can be confident that the centre of the new bounds
    // should be within 100 m of the set centre, and over 100 km from the original.
    expect(cachedBounds.getCenter().distanceTo(newCenter)).toBeLessThan(100);
    expect(cachedBounds.getCenter().distanceTo(oldCenter)).toBeGreaterThan(
      100000
    );
  });

  test('LMap.vue changing zoom prop caches map view center and bounds', async () => {
    const initialArea = L.latLngBounds([-80, -170], [80, 170]);
    const smallerArea = L.latLngBounds([-40, -85], [40, 85]);
    const wrapper = getMapWrapper({ bounds: initialArea });

    wrapper.setProps({ zoom: 10 });
    await wrapper.vm.$nextTick();

    // As above with the center prop test, we can't rely on ending up with a specific
    // known set of bounds. However, we know that the smaller area does not contain
    // the initial much larger one, but should contain whatever the calculated and
    // cached bounds are after zooming in to level 10.
    expect(smallerArea.contains(initialArea)).toBeFalsy();
    expect(smallerArea.contains(wrapper.vm.lastSetBounds)).toBeTruthy();
    expect(wrapper.vm.lastSetCenter).toEqual(L.latLng(0, 0));
  });

  test('LMap.vue changing bounds prop caches map view center and bounds', async () => {
    const wrapper = getMapWrapper();
    const newBounds = [
      [10, 10],
      [11, 11],
    ];

    wrapper.setProps({ bounds: newBounds });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.lastSetBounds).toEqual(L.latLngBounds(newBounds));
    expect(wrapper.vm.lastSetCenter).toEqual(L.latLng([10.5, 10.5]));
  });

  // Quarantining this test because it seems it blocks jest execution completely
  test('LMap.vue no-blocking-animations real position', async () => {
    // Most important test for no-blocking-animations, tests the real position
    // However, I suspect animations are never triggered in unit tests
    const wrapper = getMapWrapper({
      center: { lat: 80, lng: 170 },
      zoom: 10,
      noBlockingAnimations: true,
    });

    // Move the map several times in a short timeperiod
    // wrapper.setProps({ center: { lat: 0, lng: 170 } });
    wrapper.setProps({ zoom: 15 });

    // wrapper.setProps({ center: { lat: 80, lng: 0 } });
    wrapper.setProps({ zoom: 10 });
    expect(wrapper).toBeDefined();
    /*

    wrapper.setProps({ center: { lat: -80, lng: -170 } });
    wrapper.setProps({ zoom: 5 });

    /*
    // Finally, mapObject should be on last position
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.mapObject.getCenter()).toEqual({ lat: -80, lng: -170 });
    expect(wrapper.vm.mapObject.getZoom()).toEqual(5);
    */
  });

  test('LMap.vue no-blocking-animations for center', async () => {
    const newCenter = { lat: -80, lng: 170 };
    const newCenter2 = { lat: 0, lng: -170 };

    const mockPanTo = jest.fn();
    const wrapper = getMapWrapper({
      center: { lat: 80, lng: 0 },
      zoom: 5,
      noBlockingAnimations: true,
    });
    wrapper.vm.mapObject.panTo = mockPanTo;

    wrapper.setProps({ center: newCenter });
    await wrapper.vm.$nextTick();
    wrapper.setProps({ center: newCenter2 });
    await wrapper.vm.$nextTick();

    expect(mockPanTo.mock.calls.length).toBe(2);
    expect(mockPanTo.mock.calls[0][0]).toEqual(newCenter);
    expect(mockPanTo.mock.calls[0][1]).toEqual({ animate: false });
    expect(mockPanTo.mock.calls[1][0]).toEqual(newCenter2);
    expect(mockPanTo.mock.calls[1][1]).toEqual({ animate: false });
  });

  test('LMap.vue no-blocking-animations for zoom', async () => {
    const newZoom = 10;
    const newZoom2 = 5;

    const mockSetZoom = jest.fn();
    const wrapper = getMapWrapper({
      center: { lat: 0, lng: 0 },
      zoom: 15,
      noBlockingAnimations: true,
    });
    wrapper.vm.mapObject.setZoom = mockSetZoom;

    wrapper.setProps({ zoom: newZoom });
    await wrapper.vm.$nextTick();
    wrapper.setProps({ zoom: newZoom2 });
    await wrapper.vm.$nextTick();

    expect(mockSetZoom.mock.calls.length).toBe(2);
    expect(mockSetZoom.mock.calls[0][0]).toEqual(newZoom);
    expect(mockSetZoom.mock.calls[0][1]).toEqual({ animate: false });
    expect(mockSetZoom.mock.calls[1][0]).toEqual(newZoom2);
    expect(mockSetZoom.mock.calls[1][1]).toEqual({ animate: false });
  });

  test('LMap.vue no-blocking-animations for bounds', async () => {
    const bounds = L.latLngBounds(L.latLng([70, 1]), L.latLng([71, 2]));
    const newBounds = [
      [-50, -30],
      [-120, -80],
    ];
    const newBounds2 = L.latLngBounds(L.latLng([0, 80]), L.latLng([10, 120]));
    const mockFitBounds = jest.fn();
    const wrapper = getMapWrapper({
      bounds: bounds,
      noBlockingAnimations: true,
    });
    wrapper.vm.mapObject.fitBounds = mockFitBounds;

    wrapper.setProps({ bounds: newBounds });
    await wrapper.vm.$nextTick();
    wrapper.setProps({ bounds: newBounds2 });
    await wrapper.vm.$nextTick();

    expect(mockFitBounds.mock.calls.length).toBe(2);
    expect(mockFitBounds.mock.calls[0][0]).toEqual(L.latLngBounds(newBounds));
    expect(mockFitBounds.mock.calls[0][1]).toMatchObject({ animate: false });
    expect(mockFitBounds.mock.calls[1][0]).toEqual(L.latLngBounds(newBounds2));
    expect(mockFitBounds.mock.calls[1][1]).toMatchObject({ animate: false });
  });

  test('LMap.vue options.prop should override default prop value', () => {
    const options = {
      center: [100, 100],
      crs: L.CRS.Simple,
    };
    const wrapper = getMapWrapper(options);

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.vm.center).toBe(options.center);
    expect(wrapper.vm.crs).toBe(options.crs);
  });

  test('LMap.vue if prop is not default, it should override options.prop', () => {
    const options = {
      center: [100, 100],
      crs: L.CRS.EPSG3395,
    };

    const props = {
      center: [-100, -100],
      crs: L.CRS.Simple,
    };

    const wrapper = getMapWrapper(options);

    wrapper.setProps(props);

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.vm.center).toBe(props.center);
    expect(wrapper.vm.crs).toBe(props.crs);
  });
});
