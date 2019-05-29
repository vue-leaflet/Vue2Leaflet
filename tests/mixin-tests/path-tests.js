import { getWrapperWithMap } from '@/tests/test-helpers';

export const testPathFunctionality = (component, componentName = 'it') => {
  //
  // Stroke

  test(`${componentName} accepts and uses stroke prop when true`, () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: true });

    expect(wrapper.vm.mapObject.options.stroke).toBeTruthy();
  });

  test(`${componentName} accepts and uses stroke prop when false`, () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: false });

    expect(wrapper.vm.mapObject.options.stroke).toBeFalsy();
  });

  test(`${componentName} updates stroke when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: true });

    wrapper.setProps({ stroke: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.stroke).toBeFalsy();
  });

  test(`${componentName} updates stroke using setStroke`, async () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: true });

    wrapper.vm.setStroke(false);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.stroke).toBeFalsy();
  });

  // Color

  test(`${componentName} accepts and uses color prop`, () => {
    const color = '#314159';
    const { wrapper } = getWrapperWithMap(component, { color });

    expect(wrapper.vm.mapObject.options.color).toEqual(color);
  });

  test(`${componentName} updates color when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { color: '#314159' });

    const newColor = '#112233';
    wrapper.setProps({ color: newColor });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.color).toEqual(newColor);
  });

  test(`${componentName} updates color using setColor`, async () => {
    const { wrapper } = getWrapperWithMap(component, { color: '#314159' });

    const newColor = '#112233';
    wrapper.vm.setColor(newColor);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.color).toEqual(newColor);
  });
};
