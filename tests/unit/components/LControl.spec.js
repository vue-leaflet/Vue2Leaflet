import { getWrapperWithMap } from '@/tests/test-helpers';
import LControl from '@/components/LControl.vue';

describe('component: LControl.vue', () => {
  test('LControl.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LControl);

    expect(wrapper.vm.mapObject).toBeDefined();
  });

  // Leaflet Control options

  test('LControl.vue uses the "position" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControl, { position: 'bottomleft' });

    expect(wrapper.vm.mapObject.getPosition()).toBe('bottomleft');
  });

  test('LControl.vue uses default slot', () => {
    const textSlot = 'Hello from slot!';
    const { wrapper } = getWrapperWithMap(LControl, {}, {
      slots: {
        default: textSlot
      }
    });

    expect(wrapper.text()).toContain(textSlot);
  });

  test('LControl.vue not propagation dblclick by default', () => {
    const { wrapper, mapWrapper } = getWrapperWithMap(LControl);
    const initZoom = mapWrapper.vm.mapObject.getZoom();
    wrapper.trigger('dblclick');
    wrapper.trigger('dblclick');
    wrapper.trigger('dblclick');
    expect(mapWrapper.vm.mapObject.getZoom()).toEqual(initZoom);
  });

  test('LControl.vue enable propagation dblclick', () => {
    const triggerCount = 3;
    const { wrapper, mapWrapper } = getWrapperWithMap(LControl, {
      disableClickPropagation: false
    });
    const initZoom = mapWrapper.vm.mapObject.getZoom();
    for (let i = 0; i < triggerCount; ++i) {
      wrapper.trigger('dblclick');
    }
    expect(mapWrapper.vm.mapObject.getZoom()).toEqual(initZoom + triggerCount);
  });
});
