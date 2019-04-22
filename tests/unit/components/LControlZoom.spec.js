import { getWrapperWithMap, see } from '@/tests/test-helpers';
import LControlZoom from '@/components/LControlZoom.vue';

describe('component: LControlZoom', () => {
  test('it has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LControlZoom);
    expect(wrapper.vm.mapObject).toBeDefined();
  });

  test('it accepts and uses the control position option', () => {
    const { wrapper } = getWrapperWithMap(LControlZoom, { position: 'bottomleft' });
    expect(wrapper.vm.mapObject.getPosition()).toBe('bottomleft');
  });

  test('it updates the mapObject when position prop is changed', async () => {
    const { wrapper } = getWrapperWithMap(LControlZoom, { position: 'bottomleft' });
    wrapper.setProps({ position: 'topright' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.mapObject.getPosition()).toBe('topright');
  });

  test('it includes zoomInText in rendered html', async () => {
    const { mapWrapper } = getWrapperWithMap(LControlZoom, { zoomInText: 'BIGGER' });
    see(mapWrapper, 'BIGGER');
  });

  test('it includes zoomOutText in rendered html', () => {
    const { mapWrapper } = getWrapperWithMap(LControlZoom, { zoomOutText: 'smaller' });
    see(mapWrapper, 'smaller');
  });

  test('it includes zoomInTitle in rendered html', () => {
    const { mapWrapper } = getWrapperWithMap(LControlZoom, { zoomInTitle: 'zoom in more' });
    see(mapWrapper, 'zoom in more');
  });

  test('it includes zoomOutTitle in rendered html', () => {
    const { mapWrapper } = getWrapperWithMap(LControlZoom, { zoomOutTitle: 'zoom out a bit' });
    see(mapWrapper, 'zoom out a bit');
  });
});
