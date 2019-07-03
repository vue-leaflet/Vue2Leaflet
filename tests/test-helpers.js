import { createLocalVue, shallowMount } from '@vue/test-utils';
import LMap from '@/components/LMap.vue';

const localVue = createLocalVue();

export function getMapWrapper (propsData) {
  return shallowMount(LMap, {
    localVue,
    propsData,
    sync: false // avoid warning, see
    // Removing sync mode #1137 https://github.com/vuejs/vue-test-utils/issues/1137
  });
}

export function getWrapperWithMap (lComponent, propsData, mountOptions) {
  const mapWrapper = getMapWrapper();

  const componentCreated = lComponent.created;
  const componentToMount = {
    ...lComponent,
    created () {
      // Ensure existing created hook still runs, if it exists.
      if (typeof componentCreated === 'function') {
        componentCreated.bind(this)();
      }
      // trick from here https://github.com/vuejs/vue-test-utils/issues/560#issuecomment-461865315
      this.$parent = mapWrapper.vm;
    }
  };

  const wrapper = shallowMount(componentToMount, {
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

export function see (component, text) {
  expect(component.html()).toContain(text);
}
