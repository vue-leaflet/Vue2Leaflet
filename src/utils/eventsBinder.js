import _ from 'lodash';

export default (vueElement, leaflet, events) => {
  _.forEach(events, (eventName) => {
    const exposedName = 'l-' + eventName;
    leaflet.on(eventName, (ev) => {
      vueElement.$emit(exposedName, ev);
    });
  });
}
