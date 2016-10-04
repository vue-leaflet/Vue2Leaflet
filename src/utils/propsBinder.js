import _ from 'lodash'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default (vueElement, leafletElement, props, options) => {
  _.forEach(props, ({twoWay: twoWay, type:type, custom:custom, eventName:eventName}, attribute) => {
    const setMethodName = 'set' + capitalizeFirstLetter(attribute);
    vueElement.$watch(attribute, (newVal, oldVal) => {
      if (custom) {
        vueElement[setMethodName](newVal, oldVal);
      } else {
        leafletElement[setMethodName](newVal);
      }
    }, {
        deep: type === Object
    });
  });
}
