import { getWrapperWithMap } from '@/tests/test-helpers';
import LMarker from '@/components/LMarker.vue';
import L from 'leaflet';

describe('component: LMarker.vue', () => {
  test('LMarker.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LMarker, {
      latLng: [0, 0]
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.mapObject).toBeDefined();
  });

  test('LMarker.vue updates the mapObject latLng when props change', async () => {
    const initLatlng = L.latLng([11, 22]);
    const { wrapper } = getWrapperWithMap(LMarker, {
      latLng: initLatlng
    });

    const markerObject = wrapper.vm.mapObject;
    expect(markerObject.getLatLng().equals(initLatlng)).toBe(true);

    const newLatLng = L.latLng([1, 1]);
    wrapper.setProps({ latLng: newLatLng });
    await wrapper.vm.$nextTick();

    expect(markerObject.getLatLng().equals(newLatLng)).toBe(true);
  });

  test('LMarker.vue displays text from its default slot', async () => {
    const markerText = 'Hello from marker!';
    const { wrapper } = getWrapperWithMap(LMarker, {
      latLng: [0, 0]
    }, {
      slots: {
        default: markerText
      }
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toEqual(markerText);
  });

  test('LMarker.vue "draggable" prop toggles mapObject dragging option', async () => {
    const { wrapper } = getWrapperWithMap(LMarker, {
      latLng: [0, 0],
      draggable: false
    });
    const markerObject = wrapper.vm.mapObject;

    expect(markerObject.dragging.enabled()).toBeFalsy();

    wrapper.setProps({ draggable: true });
    await wrapper.vm.$nextTick();

    expect(markerObject.dragging.enabled()).toBeTruthy();

    wrapper.setProps({ draggable: false });
    await wrapper.vm.$nextTick();

    expect(markerObject.dragging.enabled()).toBeFalsy();
  });

  test('LMarker.vue does not change the mapObject latLng value when set to null', async () => {
    const initLatlng = L.latLng([11, 22]);
    const { wrapper } = getWrapperWithMap(LMarker, {
      latLng: initLatlng
    });

    wrapper.setProps({ latLng: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.mapObject.getLatLng().equals(initLatlng)).toBe(true);
  });

  test('LMarkver.vue "opacity" prop defaults to 1 and updates mapObject opacity option', async () => {
    const { wrapper } = getWrapperWithMap(LMarker, {
      latLng: [0, 0]
    });
    const markerObject = wrapper.vm.mapObject;

    expect(markerObject.options.opacity).toBe(1);

    wrapper.setProps({ opacity: 0.42 });
    await wrapper.vm.$nextTick();

    expect(markerObject.options.opacity).toBe(0.42);
  });
});
