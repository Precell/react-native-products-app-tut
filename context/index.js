// create the context
// provide the context
// consume that context

import { createContext, useEffect, useState } from "react";

const Context = createContext(null);



const ProductContext = ({ children }) => {
  // List of Products
  const [products, setProducts] = useState([]);
  
  
  useEffect(() =>{

    async function getProductsFromApi(){
        const apiRes = await fetch('https://dummyjson.com/products')
        const finalResult = await apiRes.json()

        if (finalResult) {
            setProducts(finalResult.products)          
        }
    }

    getProductsFromApi()
}, [])

console.log(products);

  return <Context.Provider value={{ products }}>{children}</Context.Provider>;
};

export default ProductContext;
