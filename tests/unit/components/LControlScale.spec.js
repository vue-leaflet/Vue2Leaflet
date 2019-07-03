import { getWrapperWithMap } from '@/tests/test-helpers';
import LControlScale from '@/components/LControlScale.vue';

describe('component: LControlScale.vue', () => {
  test('LControlScale.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LControlScale);

    expect(wrapper.vm.mapObject).toBeDefined();
  });

  // Leaflet Control options

  test('LControlScale.vue uses the "position" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControlScale, { position: 'bottomleft' });

    expect(wrapper.vm.mapObject.getPosition()).toBe('bottomleft');
  });

  // Leaflet Control.Scale options

  test('LControlScale.vue uses the "maxWidth" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControlScale, { maxWidth: 37 });

    expect(wrapper.vm.mapObject.options.maxWidth).toBe(37);
  });

  test('LControlScale.vue uses the "metric" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControlScale, { metric: false });

    expect(wrapper.vm.mapObject.options.metric).toBeFalsy();
  });

  test('LControlScale.vue uses the "imperial" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControlScale, { imperial: false });

    expect(wrapper.vm.mapObject.options.imperial).toBeFalsy();
  });

  test('LControlScale.vue uses the "updateWhenIdle" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControlScale, { updateWhenIdle: true });

    expect(wrapper.vm.mapObject.options.updateWhenIdle).toBeTruthy();
  });

  // Leaflet Control set* methods

  test('LControlScale.vue updates the mapObject when the "position" prop is set', async () => {
    const { wrapper } = getWrapperWithMap(LControlScale, { position: 'bottomleft' });
    wrapper.setProps({ position: 'topright' });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getPosition()).toBe('topright');
  });
});
