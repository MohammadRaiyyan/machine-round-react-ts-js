async function fetchWithTimeout(url, timeout) {
  try {
    const controller = new AbortController();
    const timerId = setTimeout(() => {
      if (!controller.signal.aborted) {
        controller.abort();
      }
    }, timeout);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timerId);
    return await res.json();
  } catch (error) {
    throw error;
  }
}
try {
  const products = await fetchWithTimeout(
    "https://formatjsononline.com/api/products",
    5000,
  );
  console.log("Products", products);
} catch (error) {
  console.log(error);
}
