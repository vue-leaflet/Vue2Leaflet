import { getWrapperWithMap } from '@/tests/test-helpers';
import { testCircleFunctionality } from '@/tests/mixin-tests/circle-tests';
import LCircleMarker from '@/components/LCircleMarker.vue';
import L from 'leaflet';

describe('component: LCircleMarker.vue', () => {
  test('LCircleMarker.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LCircleMarker);

    expect(wrapper.vm.mapObject).toBeDefined();
  });

  // Circle mixin

  testCircleFunctionality(LCircleMarker, 'LCircleMarker.vue');

  // latLng property

  test('LCircleMarker.vue accepts and uses latLng prop as an array', () => {
    const latLng = [3.14, 2.79];
    const { wrapper } = getWrapperWithMap(LCircleMarker, { latLng });

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(L.latLng(latLng));
  });

  test('LCircleMarker.vue accepts and uses latLng prop as a Leaflet object', () => {
    const latLng = L.latLng([3.14, 2.79]);
    const { wrapper } = getWrapperWithMap(LCircleMarker, { latLng });

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(latLng);
  });

  test('LCircleMarker.vue updates the mapObject latLng when prop is changed to an array', async () => {
    const { wrapper } = getWrapperWithMap(LCircleMarker, { latLng: [11, 22] });

    const newLatLng = [1, 1];
    wrapper.setProps({ latLng: newLatLng });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(L.latLng(newLatLng));
  });

  test('LCircleMarker.vue updates the mapObject latLng when prop is changed to an object', async () => {
    const { wrapper } = getWrapperWithMap(LCircleMarker, { latLng: [11, 22] });

    const newLatLng = L.latLng([1, 1]);
    wrapper.setProps({ latLng: newLatLng });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(newLatLng);
  });

  // Pane

  test('LCircleMarker.vue accepts and uses pane prop', () => {
    const pane = 'overlayPane';
    const { wrapper } = getWrapperWithMap(LCircleMarker, { pane });

    expect(wrapper.vm.mapObject.options.pane).toEqual(pane);
  });

  // Slot

  test('LCircleMarker.vue displays text from its default slot', async () => {
    const markerText = 'O hai, Marker!';
    const { wrapper } = getWrapperWithMap(LCircleMarker, {
      latLng: [0, 0]
    }, {
      slots: {
        default: markerText
      }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toEqual(markerText);
  });
});
