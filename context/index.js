// create the context
// provide the context
// consume that context

import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ProductContext = ({ children }) => {
  // List of Products
  const [products, setProducts] = useState([]);

  //Loading state
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function getProductsFromApi() {
      const apiRes = await fetch("https://dummyjson.com/products");
      const finalResult = await apiRes.json();

      if (finalResult) {
        setLoading(false)
        setProducts(finalResult.products);
      }
    }

    getProductsFromApi();
  }, []);


  return <Context.Provider value={{ products, Loading }}>{children}</Context.Provider>;
};

export default ProductContext;
