export default function formatDigit(number) {
  return String(number).replace(/^(\d)$/, "0$1");
}
