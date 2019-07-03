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
    const newBounds = [[4, 4], [5, 5]];
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
    expect(mockFitBounds.mock.calls[0][1]).toEqual({});
    expect(mockFitBounds.mock.calls[1][0]).toEqual(L.latLngBounds(newBounds2));
    expect(mockFitBounds.mock.calls[1][1]).toEqual({});
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
    const optionsPadding = {
      padding: [5, 5]
    };
    const optionsPadding2 = {
      paddingBottomRight: [4, 4],
      paddingTopLeft: [3, 3]
    };
    const mockFitBounds = jest.fn();
    const wrapper = getMapWrapper();
    wrapper.vm.mapObject.fitBounds = mockFitBounds;

    wrapper.setProps({ padding: optionsPadding.padding });
    wrapper.setProps({ paddingBottomRight: optionsPadding2.paddingBottomRight });
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
    expect(mockFitBounds.mock.calls[0][1]).toEqual(optionsPadding);
    expect(mockFitBounds.mock.calls[1][0]).toEqual(L.latLngBounds(bounds2));
    expect(mockFitBounds.mock.calls[1][1]).toEqual(optionsPadding2);
  });

  test('LMap.vue no-blocking-animations options', async () => {
    const wrapper = getMapWrapper({
      noBlockingAnimations: true
    });

    // Move the map several times in a short timeperiod
    wrapper.setProps({ center: { lat: -80, lng: 170 } });
    wrapper.setProps({ zoom: 15 });

    wrapper.setProps({ center: { lat: 0, lng: 0 } });
    wrapper.setProps({ zoom: 10 });

    wrapper.setProps({ center: { lat: 80, lng: -170 } });
    wrapper.setProps({ zoom: 5 });

    // Finally, mapObject should be on last position
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.mapObject.getCenter()).toEqual({ lat: 80, lng: -170 });
      expect(wrapper.vm.mapObject.getZoom()).toEqual(5);
    });
  });
});
