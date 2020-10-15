import mockConsole from "jest-mock-console";
import { getWrapperWithMap } from '@/tests/test-helpers';
import LRectangle from '@/components/LRectangle.vue';
import { latLngBounds } from 'leaflet';

describe('component: LRectangle.vue', () => {
  beforeEach(() => {
    mockConsole();
  });

  test('it has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LRectangle);

    expect(console.error).not.toHaveBeenCalled();
    expect(wrapper.vm.mapObject).toBeDefined();
  });

  test('it accepts a valid pair of coordinates as its bounds', () => {
    const bounds = [[1.2, 2.3], [3.4, 4.5]];

    const { wrapper } = getWrapperWithMap(LRectangle, { bounds });

    expect(console.error).not.toHaveBeenCalled();
    expect(wrapper.vm.mapObject).toBeInstanceOf(L.Rectangle);
  });

  test('it accepts valid Leaflet LatLngBounds as its bounds', () => {
    const bounds = latLngBounds([1.2, 2.3], [3.4, 4.5]);

    const { wrapper } = getWrapperWithMap(LRectangle, { bounds });

    expect(console.error).not.toHaveBeenCalled();
    expect(wrapper.vm.mapObject).toBeInstanceOf(L.Rectangle);
  });

});
