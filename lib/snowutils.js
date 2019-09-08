// undefined v0.0.1 Copyright 2019 death_hpw
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.snowutils = global.snowutils || {}));
}(this, function (exports) { 'use strict';

const docE = document.documentElement;


const flag = "classList" in docE;

function hasClass (dom, cls) {
  return !flag ? !!dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) : dom.classList.contains(cls);
}

function addClass (dom, classArray) {
  if (!flag) {
    for (let cls of classArray) {
      if (!hasClass(dom, cls)) dom.className += " " + cls;
    }
  } else {
    dom.classList.add(...classArray);
  }
}

function removeClass (dom, classArray) {
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

function itemClass (dom, index) {
  return !flag ? dom.className.split(/\s+/g)[index] || null : dom.classList.item(index);
}

function toggleClass (dom, className) {
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

function classNamesList (dom) {
  return !flag ? dom.className.split(/\s+/g, " ").join(" ") : dom.classList
}

function getQueryValueByKey(key) {
  let search = window.location.search;
  let res = [];
  key = decodeURIComponent(key);
	if (search.indexOf("?") !== -1) {
    search = decodeURIComponent(search);
    const queryArr  = search.substr(1).split("&");
    for (let i=0; i < queryArr.length; i++) {
      let t = queryArr[i].split("=");
      if (t[0] === key) {
        res.push(t[1]);
      } 
    }
  } 
  return res.length > 0 ? res : null;
}

function toQueryString(obj) {
	let ret = [];
	for (let key in obj) {
		key = encodeURIComponent(key);
		let value = obj[key];
		if (value && value instanceof Array) {
			let queryValues = [];
			for (let i = 0, len = value.length; i < len; i++) {
        queryValues.push(encodeURIComponent(key) +  "=" + encodeURIComponent(value[i]));
			}
			ret = ret.concat(queryValues);
		} else {
			ret.push(encodeURIComponent(key) + "="  + encodeURIComponent(value));
		}
	}
	 return ret.join('&');
}

function getStyle (element, attr) {
  if (element.currentStyle) {
    return element.currentStyle[attr];
  } else {
    return window.getComputedStyle(element, false)[attr];
  }
}

let vendor = (() => {
  let element = document.createElement("div");
  element.style.display = "none";
  let transformNames = {
    "webkit": "webkitTransform",
    "Moz": "MozTransform",
    "O": "OTransform",
    "ms": "msTransform",
    "standard": "transform"
  };
  for (let key in transformNames) {
    if (element.style[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

function prefixStyle (style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === "standard") {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substring(1);
}

function type (data) {
  return Object.prototype.toString.call(data)
}

// Object.prototype.toString.call(bool);  "[object Boolean]"
// Object.prototype.toString.call(num);  "[object Number]"
// Object.prototype.toString.call(str);  "[object String]"
// Object.prototype.toString.call(und);  "[object Undefined]"
// Object.prototype.toString.call(nul);  "[object Null]"
// Object.prototype.toString.call(arr);  "[object Array]"
// Object.prototype.toString.call(obj);  "[object Object]"
// Object.prototype.toString.call(fun);  "[object Function]"
// Object.prototype.toString.call(promise)  "[object Promise]"

function formatDigit(number) {
  return String(number).replace(/^(\d)$/, "0$1");
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function uaCheck (device) {

  let devices = ["ios", "android", "weixin"];
  if (!device || devices.indexOf(device) === -1) return false;
  let ua = window.navigator.userAgent;
  device === devices[0] ? !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) :
    device === devices[1] ? (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) :
      device === devices[2] ? !!ua.match(/MicroMessenger/i) : null;
}

function viewportSize () {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}

function timeStampToDate (stamp, formatType, symbol) {
  stamp = String(stamp).length === 13 ? stamp : stamp * 1000;
  const time = new Date(stamp);
  let year = time.getFullYear();
  let month = formatDigit(time.getMonth() + 1);
  let day = formatDigit(time.getDate());
  let hours = formatDigit(time.getHours());
  let minutes = formatDigit(time.getMinutes());
  let seconds = formatDigit(time.getSeconds());
  let res;
  switch (formatType) {
    case "YYYYMMDD":
      res = `${year + symbol + month + symbol + day}`;
      break;
    case "YYMM":
      res = `${year + symbol + month}`;
      break;
    case "MMDD":
      res = `${month + symbol + day}`;
      break;
    case "HHmmss":
      res = `${hours + symbol + minutes + symbol + seconds}`;
      break;
    case "HHmm":
      res = `${hours + symbol + minutes}`;
      break;
    case "mmss":
      res = `${minutes + symbol + seconds}`;
      break;
    default:
      res = `${year + symbol + month + symbol + day + symbol + hours + symbol + minutes + symbol + seconds}`;
      break;
  }
  return res;
}


function dateToTimeStamp (date, unit) {
  return unit === "s" ? new Date(date).getTime() / 1000 : new Date(date).getTime();
}

function carVinCheck (vin) {
  const reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{17}$/, "gi");
  return reg.test(vin);
}

function max (array) {
  return Math.max.apply(null, array)
}

function min (array) {
  return Math.min.apply(null, array)
}

function flattenDeep (array) {
  if ("flat" in Array.prototype) {
    return array.flat(Infinity)
  } else {
    return array.reduce((prev, curr) => Array.isArray(curr) ? prev.concat(flattenDeep(curr)) : prev.concat(curr), []);
  }
}

function cloneDeep (obj) {
  if (obj === null) return null;
  let newObj = obj instanceof Array ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      newObj[i] = typeof obj[i] === 'object' ? cloneDeep(obj[i]) : obj[i];
    }
  }
  return newObj;
}

function shuffle (arr) {
  const newArr = [].concat(arr);
  for (let i = 0; i < newArr.length; i++) {
    let r = randomInt(0, i);
    let t = newArr[i];
    newArr[i] = newArr[r];
    newArr[r] = t;
  }
  return newArr;
}

function sum (array) {
  return array.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}

function unique (...args) {
  let result;
  if (args.length >= 2) {
    result = [...new Set([].concat(args).flat())];
  } else {
    result = new Set(...args);
  }
  return result;
}

exports.addClass = addClass;
exports.carVinCheck = carVinCheck;
exports.classNamesList = classNamesList;
exports.cloneDeep = cloneDeep;
exports.dateToTimeStamp = dateToTimeStamp;
exports.device = uaCheck;
exports.flattenDeep = flattenDeep;
exports.formatDigit = formatDigit;
exports.getQueryValueByKey = getQueryValueByKey;
exports.getStyle = getStyle;
exports.hasClass = hasClass;
exports.itemClass = itemClass;
exports.max = max;
exports.min = min;
exports.prefixStyle = prefixStyle;
exports.randomInt = randomInt;
exports.removeClass = removeClass;
exports.shuffle = shuffle;
exports.sum = sum;
exports.timeStampToDate = timeStampToDate;
exports.toQueryString = toQueryString;
exports.toggleClass = toggleClass;
exports.type = type;
exports.unique = unique;
exports.viewportSize = viewportSize;

Object.defineProperty(exports, '__esModule', { value: true });

}));
