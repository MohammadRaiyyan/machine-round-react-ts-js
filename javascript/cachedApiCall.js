function cachedApiCall(expiryTime) {
  const cache = {};
  return async (url, config = {}) => {
    const key = `${url}${JSON.stringify(config)}`;
    console.log("Key", key);
    const entry = cache[key];
    console.log("Cache", cache);
    if (!entry || Date.now() > entry.expireAt) {
      try {
        let res = await fetch(url, config);
        res = res.json();
        cache[key] = {
          value: res,
          expireAt: Date.now() + expiryTime,
        };
        console.log("Fetching fresh data", cache);
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Fetching from cache data", cache);
    }
    return cache[key].value;
  };
}

const callApi = cachedApiCall(5000);
callApi(`https://dummyjson.com/products/search?q=ph&limit=1`)
  .then((res) => console.log("Response", res))
  .catch((e) => console.error(e));

setTimeout(() => {
  callApi(`https://dummyjson.com/products/search?q=ph&limit=1`)
    .then((res) => console.log("Response", res))
    .catch((e) => console.error(e));
}, 2000);

setTimeout(() => {
  callApi(`https://dummyjson.com/products/search?q=ph&limit=1`)
    .then((res) => console.log("Response", res))
    .catch((e) => console.error(e));
}, 10000);
