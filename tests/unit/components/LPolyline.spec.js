import { getWrapperWithMap } from '@/tests/test-helpers';
import { testPolylineFunctionality, toLeafletLL } from '@/tests/mixin-tests/polyline-tests';
import LPolyline from '@/components/LPolyline.vue';

describe('component: LPolyline.vue', () => {
  test('LPolyline.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LPolyline);

    expect(wrapper.vm.mapObject).toBeDefined();
  });

  // Polyline mixin

  testPolylineFunctionality(LPolyline, 'LPolyline.vue');

  // latLngs property

  test('LPolyline.vue accepts and uses latLngss prop', () => {
    const latLngs = [[3.14, 2.79], [31.4, 27.9]];
    const { wrapper } = getWrapperWithMap(LPolyline, { latLngs });

    expect(wrapper.vm.mapObject.getLatLngs()).toEqual(toLeafletLL(latLngs));
  });

  test('LPolyline.vue updates the mapObject latLngs when prop is changed', async () => {
    const { wrapper } = getWrapperWithMap(LPolyline, { latLng: [[11, 22], [22, 33]] });

    const newLatLngs = [[1, 1], [3, 3]];
    wrapper.setProps({ latLngs: newLatLngs });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getLatLngs()).toEqual(toLeafletLL(newLatLngs));
  });
});
