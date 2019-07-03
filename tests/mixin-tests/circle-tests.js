import { getWrapperWithMap } from '@/tests/test-helpers';
import { testPathFunctionality } from './path-tests';

export const testCircleFunctionality = (component, componentName = 'it') => {
  // The Circle mixin includes the Path mixin.
  testPathFunctionality(component, componentName);

  // Radius

  test(`${componentName} has a getRadius method`, () => {
    const { wrapper } = getWrapperWithMap(component);

    expect(typeof wrapper.vm.mapObject.getRadius).toEqual('function');
  });

  test(`${componentName} accepts and uses radius prop`, () => {
    const radius = 100;
    const { wrapper } = getWrapperWithMap(component, { radius });

    expect(wrapper.vm.mapObject.getRadius()).toEqual(radius);
  });

  test(`${componentName} updates radius when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { radius: 100 });

    const newRadius = 2000;
    wrapper.setProps({ radius: newRadius });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getRadius()).toEqual(newRadius);
  });
};
