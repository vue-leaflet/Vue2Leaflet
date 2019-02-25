import { createLocalVue, shallowMount } from '@vue/test-utils';
import L from 'leaflet';
import LMap from '@/components/LMap.vue';

const localVue = createLocalVue();

function getWrapper (propsData) {
  const wrapper = shallowMount(LMap, {
    localVue,
    propsData,
    sync: false // avoid warning, see
    // Removing sync mode #1137 https://github.com/vuejs/vue-test-utils/issues/1137
  });
  return wrapper;
}

describe('LMap.vue', () => {
  test('LMap.vue setCenter', () => {
    const mockPanTo = jest.fn();
    const wrapper = getWrapper();
    expect(wrapper.exists()).toBe(true);
    wrapper.vm.mapObject.panTo = mockPanTo;
    const newCenter = L.latLng([1, 1]);
    wrapper.vm.setCenter(newCenter);
    const center = wrapper.vm.lastSetCenter;
    const centerLatLng = L.latLng(center);
    expect(centerLatLng.equals(newCenter)).toBe(true);
    expect(mockPanTo.mock.calls.length).toBe(1);
    expect(mockPanTo.mock.calls[0][0]).toBe(newCenter);
  });

  test('LMap.vue center not change', () => {
    const mockPanTo = jest.fn();
    const center = L.latLng([0, 0]);
    const wrapper = getWrapper({ center: center });
    expect(wrapper.exists()).toBe(true);
    wrapper.vm.mapObject.panTo = mockPanTo;
    wrapper.vm.setCenter(center);
    expect(mockPanTo.mock.calls.length).toBe(0);
  });

  test('LMap.vue setCenter should work with [0, 0]', () => {
    const center = [0, 0];
    const mockPanTo = jest.fn();

    const wrapper = getWrapper({ center: [1, 1] });
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

    const wrapper = getWrapper({ center: initialCenter });
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
});
