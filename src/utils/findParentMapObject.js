export default (firstVueParent) => {
  let found = false
  while (!found) {
    if (firstVueParent.mapObject == undefined) {
      firstVueParent = firstVueParent.$parent;
    } else {
      found = true;
    }
  }
  return firstVueParent.mapObject;
}
