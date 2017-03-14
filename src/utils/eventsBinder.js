export default (vueElement, leaflet, events) => {
  for (var i = 0; i < events.length; i++) {
    const exposedName = 'l-' + events[i];
    const eventName = events[i];
    leaflet.on(eventName, (ev) => {
      vueElement.$emit(exposedName, ev);
    });
  }
}
