import { wrapInMap, see } from '../../test-helpers';
import LControlZoom from '@/components/LControlZoom.vue';

describe('component: LControlZoom', () => {
  test('it includes zoomInText in resulting html', async () => {
    const wrapper = await wrapInMap(LControlZoom, { zoomInText: 'BIGGER' });
    see(wrapper, 'BIGGER');
  });

  test('it includes zoomOutText in resulting html', async () => {
    const wrapper = await wrapInMap(LControlZoom, { zoomOutText: 'smaller' });
    see(wrapper, 'smaller');
  });

  test('it includes zoomInTitle in resulting html', async () => {
    const wrapper = await wrapInMap(LControlZoom, { zoomInTitle: 'zoom in more' });
    see(wrapper, 'zoom in more');
  });

  test('it includes zoomOutTitle in resulting html', async () => {
    const wrapper = await wrapInMap(LControlZoom, { zoomOutTitle: 'zoom out a bit' });
    see(wrapper, 'zoom out a bit');
  });

  test('it accepts and uses the control position option', async () => {
    const wrapper = await wrapInMap(LControlZoom, { position: 'not-the-default' });
    expect(wrapper.props('position')).toBe('not-the-default');
  });
});
