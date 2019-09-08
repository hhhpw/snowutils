export default function unique (...args) {
  let result;
  if (args.length >= 2) {
    result = [...new Set([].concat(args).flat())];
  } else {
    result = new Set(...args);
  }
  return result;
}
