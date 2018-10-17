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

export const optionsMerger = (props, options) => {
  options = options && options.constructor === Object ? options : {};
  props = props && props.constructor === Object ? props : {};
  const result = {...collectionCleaner(options)};
  props = collectionCleaner(props);
  for (let key in props) {
    if (result[key]) {
      console.warn(`${key} props is overriding the value passed in the options props`);
    }
    result[key] = props[key];
  };
  return result;
};
