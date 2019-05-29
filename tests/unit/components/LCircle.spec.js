import { getWrapperWithMap } from '@/tests/test-helpers';
import { testPathFunctionality } from '@/tests/mixin-tests/path-tests';
import LCircle from '@/components/LCircle.vue';
import L from 'leaflet';

describe('component: LCircle.vue', () => {
  test('LCircle.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LCircle);

    expect(wrapper.vm.mapObject).toBeDefined();
  });

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

  // radius property

  test('LCircle.vue accepts and uses radius prop', () => {
    const radius = 42;
    const { wrapper } = getWrapperWithMap(LCircle, { radius });
    expect(wrapper.vm.mapObject.getRadius()).toBe(radius);
  });

  test('LCircle.vue updates the mapObject radius when prop changes', async () => {
    const radius = 42;
    const { wrapper } = getWrapperWithMap(LCircle, { radius });

    const newRadius = 137;
    wrapper.setProps({ radius: newRadius });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getRadius()).toBe(newRadius);
  });

  testPathFunctionality(LCircle, 'LCircle.vue');
});
