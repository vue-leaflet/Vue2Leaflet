import { createLocalVue, shallowMount } from '@vue/test-utils';
import LControlZoom from '@/components/LControlZoom.vue';
import LMap from '@/components/LMap.vue';

describe('component: LControlZoom', () => {
  test('it can be mounted on its own', () => {
    // This test fails because the component cannot be mounted without having a
    // map object as its parent.
    // Output:
    // console.error node_modules/vue/dist/vue.runtime.common.dev.js:621
    //   [Vue warn]: Error in mounted hook: "TypeError: Cannot read property '_zoom' of undefined"
    //
    //   found in
    //
    //   ---> <LControlZoom>
    //           <Root>
    //
    // console.error node_modules/vue/dist/vue.runtime.common.dev.js:1883
    //   TypeError: Cannot read property '_zoom' of undefined
    //       at NewClass._updateDisabled (C:\code\Vue2Leaflet\node_modules\leaflet\src\control\Control.Zoom.js:109:29)
    //       at NewClass.onAdd (C:\code\Vue2Leaflet\node_modules\leaflet\src\control\Control.Zoom.js:48:8)
    //       at NewClass.addTo (C:\code\Vue2Leaflet\node_modules\leaflet\src\control\Control.js:70:42)
    //       at VueComponent.mounted (C:\code\Vue2Leaflet\src\components\LControlZoom.vue:377:20)
    //       at invokeWithErrorHandling (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:1850:57)
    //       at callHook (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:4178:7)
    //       at Object.insert (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:3126:7)
    //       at invokeInsertHook (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:6287:28)
    //       at VueComponent.patch [as __patch__] (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:6504:5)
    //       at VueComponent.Vue._update (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:3904:19)
    //       at VueComponent.updateComponent (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:4025:10)
    //       at Watcher.get (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:4426:25)
    //       at new Watcher (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:4415:12)
    //       at mountComponent (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:4032:3)
    //       at VueComponent.Object.<anonymous>.Vue.$mount (C:\code\Vue2Leaflet\node_modules\vue\dist\vue.runtime.common.dev.js:8350:10)
    //       at mount (C:\code\Vue2Leaflet\node_modules\@vue\test-utils\dist\vue-test-utils.js:8649:21)
    //       at shallowMount (C:\code\Vue2Leaflet\node_modules\@vue\test-utils\dist\vue-test-utils.js:8677:10)
    //       at Object.<anonymous> (C:\code\Vue2Leaflet\tests\unit\components\LControlZoom.spec.js:8:21)
    //       at Object.asyncJestTest (C:\code\Vue2Leaflet\node_modules\jest-jasmine2\build\jasmineAsyncInstall.js:102:37)
    //       at resolve (C:\code\Vue2Leaflet\node_modules\jest-jasmine2\build\queueRunner.js:41:12)
    //       at new Promise (<anonymous>)
    //       at mapper (C:\code\Vue2Leaflet\node_modules\jest-jasmine2\build\queueRunner.js:26:19)
    //       at promise.then (C:\code\Vue2Leaflet\node_modules\jest-jasmine2\build\queueRunner.js:71:41)
    //       at <anonymous>
    //       at process._tickCallback (internal/process/next_tick.js:189:7)
    const wrapper = shallowMount(LControlZoom, {
      localVue: createLocalVue(),
      propsData: {
        zoomInText: 'BIGGER'
      },
      sync: false
    });

    expect(wrapper.html()).toContain('BIGGER');
  });

  test('it can be mounted with LMap as its parent', () => {
    // This test fails for the same reason as above, so presumably it doesn't make
    // the parentComponent a parent of the mounted component until after it has
    // tried to mount the component, which in this instance fails.
    const wrapper = shallowMount(LControlZoom, {
      localVue: createLocalVue(),
      parentComponent: LMap,
      propsData: {
        zoomInText: 'BIGGER'
      },
      sync: false
    });

    expect(wrapper.html()).toContain('BIGGER');
  });

  test.only('it can be mounted inside an LMap slot', async () => {
    // This test passes, but the method of changing props on the component under
    // test by settings propsData on the options of the first element of the default
    // slot of the mounted component's vm seems both tedious and brittle.
    const localVue = createLocalVue();
    const mapWrapper = shallowMount(LMap, {
      localVue,
      slots: {
        default: LControlZoom
      },
      sync: false
    });

    // Manually set the propsData of the component inside the default slot of the map.
    mapWrapper.vm.$slots.default[0].componentOptions.propsData.zoomInText = 'BIGGER';

    // Allow the change in props to change in the rendered output.
    await mapWrapper.vm.$nextTick();

    expect(mapWrapper.html()).toContain('BIGGER');
  });

  test.only('it can be rendered inside an LMap slot', async () => {
    // This test passes, and allows arbitrary prop values to be set on component
    // creation by using a render function to delay creation of the component under
    // test until after the map to contain it has been mounted.
    const componentWrapper = {
      render (h) {
        return h(LControlZoom, { props: { zoomInText: 'BIGGER' } });
      }
    };
    const wrapper = shallowMount(LMap, {
      localVue: createLocalVue(),
      slots: {
        default: componentWrapper
      },
      sync: false
    });

    // Allow the props passed to the render function to become active.
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('BIGGER');
  });
});
