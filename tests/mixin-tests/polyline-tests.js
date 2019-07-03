import { getWrapperWithMap } from '@/tests/test-helpers';
import { testPathFunctionality } from './path-tests';
import L from 'leaflet';

export const toLeafletLL = (latLngs) => latLngs.map(ll => L.latLng(ll));

export const testPolylineFunctionality = (component, componentName = 'it') => {
  // The Polyline mixin includes the Path mixin.
  testPathFunctionality(component, componentName);

  // SmoothFactor

  test(`${componentName} accepts and uses smoothFactor prop`, () => {
    const smoothFactor = 1.5;
    const { wrapper } = getWrapperWithMap(component, { smoothFactor });

    expect(wrapper.vm.mapObject.options.smoothFactor).toEqual(smoothFactor);
  });

  test(`${componentName} updates smoothFactor when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { smoothFactor: 1.5 });

    const newSmoothFactor = 2.2;
    wrapper.setProps({ smoothFactor: newSmoothFactor });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.smoothFactor).toEqual(newSmoothFactor);
  });

  test(`${componentName} updates smoothFactor using setSmoothFactor`, async () => {
    const { wrapper } = getWrapperWithMap(component, { smoothFactor: 1.5 });

    const newSmoothFactor = 2.2;
    wrapper.vm.setSmoothFactor(newSmoothFactor);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.smoothFactor).toEqual(newSmoothFactor);
  });

  // NoClip

  test(`${componentName} accepts and uses noClip prop when true`, () => {
    const { wrapper } = getWrapperWithMap(component, { noClip: true });

    expect(wrapper.vm.mapObject.options.noClip).toBeTruthy();
  });

  test(`${componentName} accepts and uses noClip prop when false`, () => {
    const { wrapper } = getWrapperWithMap(component, { noClip: false });

    expect(wrapper.vm.mapObject.options.noClip).toBeFalsy();
  });

  test(`${componentName} updates noClip when prop changes to false`, async () => {
    const { wrapper } = getWrapperWithMap(component, { noClip: true });

    wrapper.setProps({ noClip: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.noClip).toBeFalsy();
  });

  test(`${componentName} updates noClip when prop changes to true`, async () => {
    const { wrapper } = getWrapperWithMap(component, { noClip: false });

    wrapper.setProps({ noClip: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.noClip).toBeTruthy();
  });

  test(`${componentName} updates noClip to false using setNoClip`, async () => {
    const { wrapper } = getWrapperWithMap(component, { noClip: true });

    wrapper.vm.setNoClip(false);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.noClip).toBeFalsy();
  });

  test(`${componentName} updates noClip to true using setNoClip`, async () => {
    const { wrapper } = getWrapperWithMap(component, { noClip: false });

    wrapper.vm.setNoClip(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.noClip).toBeTruthy();
  });

  // AddLatLng

  test(`${componentName} adds a point to an empty polyline`, async () => {
    const { wrapper } = getWrapperWithMap(component);

    const newLatLng = [1, 2];
    wrapper.vm.addLatLng(newLatLng);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getLatLngs()).toEqual(toLeafletLL([newLatLng]));
  });

  test(`${componentName} adds multiple points`, async () => {
    const { wrapper } = getWrapperWithMap(component, {

    });

    const newLatLngs = [[1, 2], [2, 3], [3, 4]];
    newLatLngs.forEach(ll => wrapper.vm.addLatLng(ll));
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.getLatLngs().length).toEqual(3);
  });
};
