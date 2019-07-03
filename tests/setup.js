// Perform any pre-test setup required.

// Trick Leaflet into thinking that JSDOM has SVG support.
// See: https://stackoverflow.com/a/54384719/607408
const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = function (uri, name) {
  const element = createElementNSOrig.apply(this, arguments);
  if (uri === 'http://www.w3.org/2000/svg' && name === 'svg') {
    element.createSVGRect = function () {};
  }

  return element;
};
