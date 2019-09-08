const docE = document.documentElement;


const flag = "classList" in docE;

export function hasClass (dom, cls) {
  return !flag ? !!dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : dom.classList.contains(cls);
}

export function addClass (dom, classArray) {
  if (!flag) {
    for (let cls of classArray) {
      if (!hasClass(dom, cls)) dom.className += " " + cls;
    }
  } else {
    dom.classList.add(...classArray);
  }
}

export function removeClass (dom, classArray) {
  if (!flag) {
    for (let cls of classArray) {
      if (hasClass(dom, cls)) {
        dom.className = dom.className.replace(cls, ' ');
      }
    }
  } else {
    dom.classList.remove(...classArray);
  }
}

export function itemClass (dom, index) {
  return !flag ? dom.className.split(/\s+/g)[index] || null : dom.classList.item(index);
}

export function toggleClass (dom, className) {
  if (!flag) {
    if (hasClass(dom, [className])) {
      removeClass(dom, [className]);
      return false;
    } else {
      addClass(dom, [className]);
      return true;
    }
  } else {
    return dom.classList.toggle(className, true);
  }

}

export function classNamesList (dom) {
  return !flag ? dom.className.split(/\s+/g, " ").join(" ") : dom.classList
}


