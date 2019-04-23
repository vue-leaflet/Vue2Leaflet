import { getWrapperWithMap, see } from '@/tests/test-helpers';
import LControlAttribution from '@/components/LControlAttribution.vue';

describe('component: LControlAttribution.vue', () => {
  test('LControlAttribution.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LControlAttribution);
    expect(wrapper.vm.mapObject).toBeDefined();
  });

  // Leaflet Control options

  test('LControlAttribution.vue uses the "position" Leaflet option', () => {
    const { wrapper } = getWrapperWithMap(LControlAttribution, { position: 'bottomleft' });
    expect(wrapper.vm.mapObject.getPosition()).toBe('bottomleft');
  });

  // Leaflet Control.Attribution options

  test('LControlAttribution.vue uses the "prefix" Leaflet option', () => {
    const prefix = 'Custom Vue2Leaflet prefix';
    const { mapWrapper } = getWrapperWithMap(LControlAttribution, { prefix });
    see(mapWrapper, prefix);
  });

  // Leaflet Control set* methods

  test('LControlAttribution.vue updates the mapObject when the "position" prop is set', async () => {
    const { wrapper } = await getWrapperWithMap(LControlAttribution, { position: 'bottomleft' });
    wrapper.setProps({ position: 'topright' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.mapObject.getPosition()).toBe('topright');
  });

  // Leaflet Control.Attribution set* methods

  test('LControlAttribution.vue updates the mapObject when the "prefix" prop is set', async () => {
    const { wrapper, mapWrapper } = await getWrapperWithMap(LControlAttribution);
    const prefix = 'something new';
    wrapper.setProps({ prefix });
    await wrapper.vm.$nextTick();
    see(mapWrapper, prefix);
  });
});
