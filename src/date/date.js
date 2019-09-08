import formatDigit from "../math/formatDigit.js";

export function timeStampToDate (stamp, formatType, symbol) {
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


export function dateToTimeStamp (date, unit) {
  return unit === "s" ? new Date(date).getTime() / 1000 : new Date(date).getTime();
}