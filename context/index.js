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
  // Favorite Items
  const [favoriteItems, setFavoriteItems] = useState([])

  const addToFavorites = (productId, reason)=>{
    let cpyFavoriteItems = [...favoriteItems]
    const index = cpyFavoriteItems.findIndex(item=>item.id === productId)

    if(index === -1){
      const getCurrentProjectItem = products.find(item=>item.id === productId)
      cpyFavoriteItems.push({
        title:getCurrentProjectItem.title,
        id: productId,
        reason
      })
    }
    setFavoriteItems(cpyFavoriteItems)

  }

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

  console.log(favoriteItems);
  return <Context.Provider value={{ products, Loading, addToFavorites, favoriteItems }}>{children}</Context.Provider>;
};

export default ProductContext;
