import { createLocalVue, mount } from '@vue/test-utils';
import L from 'leaflet';
import LMarker from '@/components/LMarker.vue';
import LMap from '@/components/LMap.vue';

const localVue = createLocalVue();

function getWrapper (propsData) {
  const ParentMapVm = mount(LMap, {
    localVue
  }).vm;

  const wrapper = mount({
    ...LMarker,
    // trick from here https://github.com/vuejs/vue-test-utils/issues/560#issuecomment-461865315
    created () {
      this.$parent = ParentMapVm;
    }
  }, {
    localVue,
    propsData,
    sync: false // avoid warning, see
    // Removing sync mode #1137 https://github.com/vuejs/vue-test-utils/issues/1137
  });
  return wrapper;
}

describe('LMarker.vue', () => {
  test('LMarker.vue change prop latLng', async () => {
    const initLatlng = L.latLng([11, 22]);
    const wrapper = getWrapper({
      latLng: initLatlng
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.mapObject.getLatLng().equals(initLatlng)).toBe(true);
    const newLatLng = L.latLng([1, 1]);
    wrapper.setProps({ latLng: newLatLng });
    await wrapper.vm.$nextTick();
    const curLatLng = wrapper.vm.mapObject.getLatLng();
    expect(curLatLng.equals(newLatLng)).toBe(true);
  });
});
