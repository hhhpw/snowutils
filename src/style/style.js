export default function getStyle (element, attr) {
  if (element.currentStyle) {
    return element.currentStyle[attr];
  } else {
    return window.getComputedStyle(element, false)[attr];
  }
}