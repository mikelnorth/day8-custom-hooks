// Named like a hook, but it never calls one.
function useFormatPrice(price) {
  return "$" + price.toFixed(2);
}

export default useFormatPrice;
