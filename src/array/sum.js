export default function sum (array) {
  return array.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}