async function retryPromise(fn, retries) {
  console.log("Trying", retries);
  try {
    const response = await fn();
    return response;
  } catch (error) {
    if (retries > 1) {
      return retryPromise(fn, retries - 1);
    }
    return Promise.reject(error);
  }
}

function myPromise() {
  const rand = Math.random() * 10;
  return new Promise((res, rej) => {
    if (rand < 5) {
      rej("Error");
    } else {
      res("pass");
    }
  });
}
console.log("Start", await retryPromise(myPromise, 4));
