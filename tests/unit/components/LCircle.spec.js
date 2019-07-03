import { getWrapperWithMap } from '@/tests/test-helpers';
import { testCircleFunctionality } from '@/tests/mixin-tests/circle-tests';
import LCircle from '@/components/LCircle.vue';
import L from 'leaflet';

describe('component: LCircle.vue', () => {
  test('LCircle.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LCircle);

    expect(wrapper.vm.mapObject).toBeDefined();
  });

  // Circle mixin

  testCircleFunctionality(LCircle, 'LCircle.vue');

  // latLng property

  test('LCircle.vue accepts and uses latLng prop as an array', () => {
    const latLng = [3.14, 2.79];
    const { wrapper } = getWrapperWithMap(LCircle, { latLng });

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(L.latLng(latLng));
  });

  test('LCircle.vue accepts and uses latLng prop as a Leaflet object', () => {
    const latLng = L.latLng([3.14, 2.79]);
    const { wrapper } = getWrapperWithMap(LCircle, { latLng });

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(latLng);
  });

  test('LCircle.vue updates the mapObject latLng when prop is changed to an array', async () => {
    const { wrapper } = getWrapperWithMap(LCircle, { latLng: [11, 22] });

    const newLatLng = [1, 1];
    wrapper.setProps({ latLng: newLatLng });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(L.latLng(newLatLng));
  });

  test('LCircle.vue updates the mapObject latLng when prop is changed to an object', async () => {
    const { wrapper } = getWrapperWithMap(LCircle, { latLng: [11, 22] });

    const newLatLng = L.latLng([1, 1]);
    wrapper.setProps({ latLng: newLatLng });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getLatLng()).toEqual(newLatLng);
  });
});
