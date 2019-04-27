import { getWrapperWithMap } from '@/tests/test-helpers';
import LControlLayers from '@/components/LControlLayers.vue';

describe('component: LControlLayers.vue', () => {
  test('LControlLayers.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LControlLayers);
    expect(wrapper.vm.mapObject).toBeDefined();
  });

  // Leaflet Control options

  test('LControlLayers.vue uses the "position" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControlLayers, { position: 'bottomleft' });
    expect(wrapper.vm.mapObject.getPosition()).toBe('bottomleft');
  });

  // Leaflet Control.Layers options

  test('LControlLayers.vue uses the "collapsed" Leaflet option', () => {
    const trueWrapper = getWrapperWithMap(LControlLayers, { collapsed: true }).wrapper;
    const falseWrapper = getWrapperWithMap(LControlLayers, { collapsed: false }).wrapper;
    expect(trueWrapper.vm.mapObject.options.collapsed).toBeTruthy();
    expect(falseWrapper.vm.mapObject.options.collapsed).toBeFalsy();
  });

  test('LControlLayers.vue uses the "autoZIndex" Leaflet option', () => {
    const trueWrapper = getWrapperWithMap(LControlLayers, { autoZIndex: true }).wrapper;
    const falseWrapper = getWrapperWithMap(LControlLayers, { autoZIndex: false }).wrapper;
    expect(trueWrapper.vm.mapObject.options.autoZIndex).toBeTruthy();
    expect(falseWrapper.vm.mapObject.options.autoZIndex).toBeFalsy();
  });

  test('LControlLayers.vue uses the "hideSingleBase" Leaflet option', () => {
    const trueWrapper = getWrapperWithMap(LControlLayers, { hideSingleBase: true }).wrapper;
    const falseWrapper = getWrapperWithMap(LControlLayers, { hideSingleBase: false }).wrapper;
    expect(trueWrapper.vm.mapObject.options.hideSingleBase).toBeTruthy();
    expect(falseWrapper.vm.mapObject.options.hideSingleBase).toBeFalsy();
  });

  test('LControlLayers.vue uses the "sortLayers" Leaflet option', () => {
    const trueWrapper = getWrapperWithMap(LControlLayers, { sortLayers: true }).wrapper;
    const falseWrapper = getWrapperWithMap(LControlLayers, { sortLayers: false }).wrapper;
    expect(trueWrapper.vm.mapObject.options.sortLayers).toBeTruthy();
    expect(falseWrapper.vm.mapObject.options.sortLayers).toBeFalsy();
  });

  test('LControlLayers.vue uses the "sortFunction" Leaflet option', () => {
    const sortFunction = jest.fn();
    const { wrapper } = getWrapperWithMap(LControlLayers, { sortFunction });
    expect(wrapper.vm.mapObject.options.sortFunction).toBe(sortFunction);
  });

  // Leaflet Control set* methods

  test('LControlLayers.vue updates the mapObject when the "position" prop is set', async () => {
    const { wrapper } = await getWrapperWithMap(LControlLayers, { position: 'bottomleft' });
    wrapper.setProps({ position: 'topright' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.mapObject.getPosition()).toBe('topright');
  });

  // TODO: Test adding and removing layers
});
