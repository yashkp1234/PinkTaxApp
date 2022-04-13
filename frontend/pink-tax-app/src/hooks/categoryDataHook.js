const getProductsHook = async (query, options = null) => {
  try {
    const res = await fetch(`/products/${query}`, options);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    return {};
  }
};

export default getProductsHook;
