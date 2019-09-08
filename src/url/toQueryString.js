export default function toQueryString(obj) {
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


