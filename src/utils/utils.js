import { setOptions } from 'leaflet';

export const debounce = (fn, time) => {
  let timeout;

  return function (...args) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(context, args);
      timeout = null;
    }, time);
  };
};

export const capitalizeFirstLetter = (string) => {
  if (!string || typeof string.charAt !== 'function') { return string; }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const propsBinder = (vueElement, leafletElement, props, options) => {
  for (const key in props) {
    const setMethodName = 'set' + capitalizeFirstLetter(key);
    const deepValue = (props[key].type === Object) ||
      (props[key].type === Array) ||
      (Array.isArray(props[key].type));
    if (props[key].custom && vueElement[setMethodName]) {
      vueElement.$watch(key, (newVal, oldVal) => {
        vueElement[setMethodName](newVal, oldVal);
      }, {
        deep: deepValue
      });
    } else if (setMethodName === 'setOptions') {
      vueElement.$watch(key, (newVal, oldVal) => {
        setOptions(leafletElement, newVal);
      }, {
        deep: deepValue
      });
    } else if (leafletElement[setMethodName]) {
      vueElement.$watch(key, (newVal, oldVal) => {
        leafletElement[setMethodName](newVal);
      }, {
        deep: deepValue
      });
    }
  }
};

export const collectionCleaner = (options) => {
  const result = {};
  for (let key in options) {
    const value = options[key];
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

export const optionsMerger = (props, instance) => {
  const options = instance.options && instance.options.constructor === Object ? instance.options : {};
  props = props && props.constructor === Object ? props : {};
  const result = collectionCleaner(options);
  props = collectionCleaner(props);
  const defaultProps = instance.$options.props;
  for (let key in props) {
    const def = defaultProps[key] ? defaultProps[key].default : Symbol('unique');
    if (result[key] && def !== props[key]) {
      console.warn(`${key} props is overriding the value passed in the options props`);
      result[key] = props[key];
    } else if (!result[key]) {
      result[key] = props[key];
    }
  };
  return result;
};

export const findRealParent = (firstVueParent) => {
  let found = false;
  while (firstVueParent && !found) {
    if (firstVueParent.mapObject === undefined) {
      firstVueParent = firstVueParent.$parent;
    } else {
      found = true;
    }
  }
  return firstVueParent;
};
