
import randomInt from "../math/randomInt";
export default function shuffle (arr) {
  const newArr = [].concat(arr);
  for (let i = 0; i < newArr.length; i++) {
    let r = randomInt(0, i);
    let t = newArr[i];
    newArr[i] = newArr[r];
    newArr[r] = t;
  }
  return newArr;
}