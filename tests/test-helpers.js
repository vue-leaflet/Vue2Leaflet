import { createLocalVue, shallowMount } from '@vue/test-utils';
import LMap from '@/components/LMap.vue';

const localVue = createLocalVue();

export async function wrapInMap (LeafletComponent, props) {
  const componentWrapper = {
    render (h) {
      return h(LeafletComponent, { props });
    }
  };
  const wrapper = shallowMount(LMap, {
    localVue,
    slots: {
      default: componentWrapper
    },
    sync: false // avoid warning, see
    // Removing sync mode #1137 https://github.com/vuejs/vue-test-utils/issues/1137
  });
  // Allow the props passed to the render function to be employed.
  await wrapper.vm.$nextTick();

  return wrapper.find(LeafletComponent);
};

export function see (component, text) {
  expect(component.html()).toContain(text);
}
