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

  test(`${componentName} updates stroke when prop changes to false`, async () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: true });

    wrapper.setProps({ stroke: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.stroke).toBeFalsy();
  });

  test(`${componentName} updates stroke when prop changes to true`, async () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: false });

    wrapper.setProps({ stroke: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.stroke).toBeTruthy();
  });

  test(`${componentName} updates stroke to false using setStroke`, async () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: true });

    wrapper.vm.setStroke(false);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.stroke).toBeFalsy();
  });

  test(`${componentName} updates stroke to true using setStroke`, async () => {
    const { wrapper } = getWrapperWithMap(component, { stroke: false });

    wrapper.vm.setStroke(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.stroke).toBeTruthy();
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

  // Weight

  test(`${componentName} accepts and uses weight prop`, () => {
    const weight = 3;
    const { wrapper } = getWrapperWithMap(component, { weight });

    expect(wrapper.vm.mapObject.options.weight).toEqual(weight);
  });

  test(`${componentName} updates weight when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { weight: 1 });

    const newWeight = 5;
    wrapper.setProps({ weight: newWeight });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.weight).toEqual(newWeight);
  });

  // Disable this till https://github.com/Leaflet/Leaflet/pull/6671 is merged on leaflet side
  test.skip(`${componentName} updates weight using setWeight`, async () => {
    const { wrapper } = getWrapperWithMap(component, { weight: 2 });

    const newWeight = 4;
    wrapper.vm.setWeight(newWeight);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.weight).toEqual(newWeight);
  });

  // Opacity

  test(`${componentName} accepts and uses opacity prop`, () => {
    const opacity = 0.3;
    const { wrapper } = getWrapperWithMap(component, { opacity });

    expect(wrapper.vm.mapObject.options.opacity).toEqual(opacity);
  });

  test(`${componentName} updates opacity when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { opacity: 0.1 });

    const newOpacity = 0.5;
    wrapper.setProps({ opacity: newOpacity });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.opacity).toEqual(newOpacity);
  });

  test(`${componentName} updates opacity using setOpacity`, async () => {
    const { wrapper } = getWrapperWithMap(component, { opacity: 0.2 });

    const newOpacity = 0.4;
    wrapper.vm.setOpacity(newOpacity);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.opacity).toEqual(newOpacity);
  });

  test(`${componentName} can set opacity to zero`, async () => {
    const { wrapper } = getWrapperWithMap(component, { opacity: 0.2 });

    const newOpacity = 0;
    wrapper.vm.setOpacity(newOpacity);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.opacity).toEqual(newOpacity);
  });

  // LineCap

  test(`${componentName} accepts and uses lineCap prop`, () => {
    const lineCap = 'round';
    const { wrapper } = getWrapperWithMap(component, { lineCap });

    expect(wrapper.vm.mapObject.options.lineCap).toEqual(lineCap);
  });

  test(`${componentName} updates lineCap when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { lineCap: 'round' });

    const newLineCap = 'square';
    wrapper.setProps({ lineCap: newLineCap });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.lineCap).toEqual(newLineCap);
  });

  test(`${componentName} updates lineCap using setLineCap`, async () => {
    const { wrapper } = getWrapperWithMap(component, { lineCap: 'square' });

    const newLineCap = 'round';
    wrapper.vm.setLineCap(newLineCap);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.lineCap).toEqual(newLineCap);
  });

  // LineJoin

  test(`${componentName} accepts and uses lineJoin prop`, () => {
    const lineJoin = 'miter';
    const { wrapper } = getWrapperWithMap(component, { lineJoin });

    expect(wrapper.vm.mapObject.options.lineJoin).toEqual(lineJoin);
  });

  test(`${componentName} updates lineJoin when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { lineJoin: 'miter' });

    const newLineJoin = 'bevel';
    wrapper.setProps({ lineJoin: newLineJoin });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.lineJoin).toEqual(newLineJoin);
  });

  test(`${componentName} updates lineJoin using setLineJoin`, async () => {
    const { wrapper } = getWrapperWithMap(component, { lineJoin: 'bevel' });

    const newLineJoin = 'miter';
    wrapper.vm.setLineJoin(newLineJoin);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.lineJoin).toEqual(newLineJoin);
  });

  // DashArray

  test(`${componentName} accepts and uses dashArray prop`, () => {
    const dashArray = '4 1';
    const { wrapper } = getWrapperWithMap(component, { dashArray });

    expect(wrapper.vm.mapObject.options.dashArray).toEqual(dashArray);
  });

  test(`${componentName} updates dashArray when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { dashArray: '4 1' });

    const newDashArray = '3 2 3';
    wrapper.setProps({ dashArray: newDashArray });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.dashArray).toEqual(newDashArray);
  });

  test(`${componentName} updates dashArray using setDashArray`, async () => {
    const { wrapper } = getWrapperWithMap(component, { dashArray: '3 2 3' });

    const newDashArray = '4 1';
    wrapper.vm.setDashArray(newDashArray);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.dashArray).toEqual(newDashArray);
  });

  // DashOffset

  test(`${componentName} accepts and uses dashOffset prop`, () => {
    const dashOffset = '1';
    const { wrapper } = getWrapperWithMap(component, { dashOffset });

    expect(wrapper.vm.mapObject.options.dashOffset).toEqual(dashOffset);
  });

  test(`${componentName} updates dashOffset when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { dashOffset: '1' });

    const newDashOffset = '3';
    wrapper.setProps({ dashOffset: newDashOffset });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.dashOffset).toEqual(newDashOffset);
  });

  test(`${componentName} updates dashOffset using setDashOffset`, async () => {
    const { wrapper } = getWrapperWithMap(component, { dashOffset: '3' });

    const newDashOffset = '1';
    wrapper.vm.setDashOffset(newDashOffset);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.dashOffset).toEqual(newDashOffset);
  });

  // Fill

  test(`${componentName} accepts and uses fill prop when true`, () => {
    const { wrapper } = getWrapperWithMap(component, { fill: true });

    expect(wrapper.vm.mapObject.options.fill).toBeTruthy();
  });

  test(`${componentName} accepts and uses fill prop when false`, () => {
    const { wrapper } = getWrapperWithMap(component, { fill: false });

    expect(wrapper.vm.mapObject.options.fill).toBeFalsy();
  });

  test(`${componentName} updates fill when prop changes to false`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fill: true });

    wrapper.setProps({ fill: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fill).toBeFalsy();
  });

  test(`${componentName} updates fill when prop changes to true`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fill: false });

    wrapper.setProps({ fill: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fill).toBeTruthy();
  });

  test(`${componentName} updates fill to false using setFill`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fill: true });

    wrapper.vm.setFill(false);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fill).toBeFalsy();
  });

  test(`${componentName} updates fill to true using setFill`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fill: false });

    wrapper.vm.setFill(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fill).toBeTruthy();
  });

  // FillColor

  test(`${componentName} accepts and uses fillColor prop`, () => {
    const fillColor = '#abcdef';
    const { wrapper } = getWrapperWithMap(component, { fillColor });

    expect(wrapper.vm.mapObject.options.fillColor).toEqual(fillColor);
  });

  test(`${componentName} updates fillColor when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fillColor: '#abcdef' });

    const newFillColor = '#987654';
    wrapper.setProps({ fillColor: newFillColor });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fillColor).toEqual(newFillColor);
  });

  test(`${componentName} updates fillColor using setFillColor`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fillColor: '#987654' });

    const newFillColor = '#abcdef';
    wrapper.vm.setFillColor(newFillColor);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fillColor).toEqual(newFillColor);
  });

  // FillOpacity

  test(`${componentName} accepts and uses fillOpacity prop`, () => {
    const fillOpacity = 0.3;
    const { wrapper } = getWrapperWithMap(component, { fillOpacity });

    expect(wrapper.vm.mapObject.options.fillOpacity).toEqual(fillOpacity);
  });

  test(`${componentName} updates fillOpacity when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fillOpacity: 0.1 });

    const newFillOpacity = 0.5;
    wrapper.setProps({ fillOpacity: newFillOpacity });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fillOpacity).toEqual(newFillOpacity);
  });

  test(`${componentName} updates fillOpacity using setFillOpacity`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fillOpacity: 0.2 });

    const newFillOpacity = 0.4;
    wrapper.vm.setFillOpacity(newFillOpacity);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fillOpacity).toEqual(newFillOpacity);
  });

  test(`${componentName} can set fillOpacity to zero`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fillOpacity: 0.2 });

    const newFillOpacity = 0;
    wrapper.vm.setFillOpacity(newFillOpacity);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fillOpacity).toEqual(newFillOpacity);
  });

  // FillRule

  test(`${componentName} accepts and uses fillRule prop`, () => {
    const fillRule = 'nonzero';
    const { wrapper } = getWrapperWithMap(component, { fillRule });

    expect(wrapper.vm.mapObject.options.fillRule).toEqual(fillRule);
  });

  test(`${componentName} updates fillRule when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fillRule: 'nonzero' });

    const newFillRule = 'evenodd';
    wrapper.setProps({ fillRule: newFillRule });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fillRule).toEqual(newFillRule);
  });

  test(`${componentName} updates fillRule using setFillRule`, async () => {
    const { wrapper } = getWrapperWithMap(component, { fillRule: 'evenodd' });

    const newFillRule = 'nonzero';
    wrapper.vm.setFillRule(newFillRule);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.fillRule).toEqual(newFillRule);
  });

  // ClassName

  test(`${componentName} accepts and uses className prop`, () => {
    const className = 'good';
    const { wrapper } = getWrapperWithMap(component, { className });

    expect(wrapper.vm.mapObject.options.className).toEqual(className);
  });

  test(`${componentName} updates className when prop changes`, async () => {
    const { wrapper } = getWrapperWithMap(component, { className: 'good' });

    const newClassName = 'evil';
    wrapper.setProps({ className: newClassName });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.className).toEqual(newClassName);
  });

  test(`${componentName} updates className using setClassName`, async () => {
    const { wrapper } = getWrapperWithMap(component, { className: 'evil' });

    const newClassName = 'good';
    wrapper.vm.setClassName(newClassName);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.mapObject.options.className).toEqual(newClassName);
  });
};
