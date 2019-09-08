
export default function getQueryValueByKey(key) {
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
};