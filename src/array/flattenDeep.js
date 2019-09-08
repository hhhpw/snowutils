export default function flattenDeep (array) {
  if ("flat" in Array.prototype) {
    return array.flat(Infinity)
  } else {
    return array.reduce((prev, curr) => Array.isArray(curr) ? prev.concat(flattenDeep(curr)) : prev.concat(curr), []);
  }
}