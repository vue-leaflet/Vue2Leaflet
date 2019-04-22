import { createLocalVue, mount } from '@vue/test-utils';
import L from 'leaflet';
import LMarker from '@/components/LMarker.vue';
import LMap from '@/components/LMap.vue';

const localVue = createLocalVue();

function getWrapperWithMap (component, propsData, mountOptions) {
  const mapWrapper = mount(LMap, {
    localVue
  });

  const wrapper = mount({
    ...component,
    // trick from here https://github.com/vuejs/vue-test-utils/issues/560#issuecomment-461865315
    created () {
      this.$parent = mapWrapper.vm;
    }
  }, {
    localVue,
    propsData,
    sync: false, // avoid warning, see
    // Removing sync mode #1137 https://github.com/vuejs/vue-test-utils/issues/1137
    ...mountOptions
  });
  return {
    wrapper,
    mapWrapper
  };
}

describe('LMarker.vue', () => {
  test('LMarker.vue change prop latLng', async () => {
    const initLatlng = L.latLng([11, 22]);
    const wrapperAndMap = getWrapperWithMap(LMarker, {
      latLng: initLatlng
    });
    const wrapper = wrapperAndMap.wrapper;
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.mapObject.getLatLng().equals(initLatlng)).toBe(true);
    const newLatLng = L.latLng([1, 1]);
    wrapper.setProps({ latLng: newLatLng });
    await wrapper.vm.$nextTick();
    const curLatLng = wrapper.vm.mapObject.getLatLng();
    expect(curLatLng.equals(newLatLng)).toBe(true);
  });

  test('LMarker.vue default slot text', async () => {
    const markerText = 'Hello from marker!';
    const wrapperAndMap = getWrapperWithMap(LMarker, {
      latLng: [0, 0]
    }, {
      slots: {
        default: markerText
      }
    });
    const wrapper = wrapperAndMap.wrapper;
    const mapWrapper = wrapperAndMap.mapWrapper;
    expect(mapWrapper.text()).toContain('Leaflet');
    expect(wrapper.exists()).toBe(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual(markerText);
  });
});
