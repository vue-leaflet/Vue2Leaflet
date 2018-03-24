export default (mapObject, listeners) => {
  for (var key in listeners) {
    mapObject.on(key, listeners[key])
  }
}
