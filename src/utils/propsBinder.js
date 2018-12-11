function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default (vueElement, leafletElement, props, options) => {
  const keys = Object.keys(props);
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const setMethodName = 'set' + capitalizeFirstLetter(key);
    if (!vueElement[setMethodName]) {
      if (props[key].custom) {
        console.warn('custom prop without matching setter: ', props[key]);
      }
      return;
    }
    const deepValue = (props[key].type === Object) ||
      (props[key].type === Array) ||
      (Array.isArray(props[key].type));
    if (props[key].custom) {
      vueElement.$watch(key, (newVal, oldVal) => {
        vueElement[setMethodName](newVal, oldVal);
      }, {
        deep: deepValue
      });
    } else if (setMethodName === 'setOptions') {
      vueElement.$watch(key, (newVal, oldVal) => {
        L.setOptions(leafletElement, newVal);
      }, {
        deep: deepValue
      });
    } else {
      // To Deprecate
      vueElement.$watch(key, (newVal, oldVal) => {
        leafletElement[setMethodName](newVal);
      }, {
        deep: deepValue
      });
    }
  }
};
