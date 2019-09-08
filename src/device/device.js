export default function uaCheck (device) {

  let devices = ["ios", "android", "weixin"];
  if (!device || devices.indexOf(device) === -1) return false;
  let ua = window.navigator.userAgent;
  device === devices[0] ? !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) :
    device === devices[1] ? (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) :
      device === devices[2] ? !!ua.match(/MicroMessenger/i) : null;
}