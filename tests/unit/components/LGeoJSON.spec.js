import { getWrapperWithMap } from '@/tests/test-helpers';
import LGeoJSON from '@/components/LGeoJson.vue';

const geojsonFeature = {
  type: 'Feature',
  properties: {
    name: 'Coors Field',
    amenity: 'Baseball Stadium',
    popupContent: 'This is where the Rockies play!'
  },
  geometry: {
    type: 'Point',
    coordinates: [-104.99404, 39.75621]
  }
};

const geojsonFeatureInFeatureCollection = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      name: 'Coors Field',
      amenity: 'Baseball Stadium',
      popupContent: 'This is where the Rockies play!'
    },
    geometry: {
      type: 'Point',
      coordinates: [-104.99404, 39.75621]
    }
  }]
};

const geojsonSecondFeatureInFeatureCollection = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      name: 'Testing name',
      amenity: 'Amazing place',
      popupContent: 'This is top place!'
    },
    geometry: {
      type: 'Point',
      coordinates: [43.4450, 39.7621]
    }
  }]
};

describe('component: LGeoJSON.vue', () => {
  test('LGeoJSON.vue has a mapObject', () => {
    const { wrapper } = getWrapperWithMap(LGeoJSON, {
      geojson: geojsonFeature
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.mapObject).toBeDefined();
  });

  test('LGeoJSON.vue add wrapper to single geojson feature as feature collection', async () => {
    const { wrapper } = getWrapperWithMap(LGeoJSON, {
      geojson: geojsonFeature
    });

    const geojsonObject = wrapper.vm.mapObject;
    expect(geojsonObject.toGeoJSON()).toEqual(geojsonFeatureInFeatureCollection);
  });

  test('LGeoJSON.vue updates the mapObject geojson when props change', async () => {
    const { wrapper } = getWrapperWithMap(LGeoJSON, {
      geojson: geojsonFeature
    });

    const geojsonObject = wrapper.vm.mapObject;
    expect(geojsonObject.toGeoJSON()).toEqual(geojsonFeatureInFeatureCollection);

    wrapper.setProps({ geojson: geojsonSecondFeatureInFeatureCollection });
    await wrapper.vm.$nextTick();

    expect(geojsonObject.toGeoJSON()).toEqual(geojsonSecondFeatureInFeatureCollection);
  });
});
