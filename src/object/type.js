export default function type (data) {
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
