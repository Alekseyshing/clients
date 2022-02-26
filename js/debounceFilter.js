export const debounce = (callback, ms) => {
  let timeout;
  return function() {
      clearTimeout(timeout);
      timeout = setTimeout(callback, ms);
  }
}