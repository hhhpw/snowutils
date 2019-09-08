
export default function carVinCheck (vin) {
  const reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{17}$/, "gi");
  return reg.test(vin);
}