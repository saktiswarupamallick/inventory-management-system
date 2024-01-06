import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";
import "./product.css"
import { getProducts } from "../../redux/features/product/productSlice";


const ProductTable = () => {
    const dispatch = useDispatch();
    const { products,  isError, message } = useSelector(
        (state) => state.product
      );

      useEffect(() => {
        
          dispatch(getProducts());
        
    
        if (isError) {
          console.log(message);
        }
      }, [ isError, message, dispatch]);
      
  return (
    <div><ProductList products={products}/></div>
  )
}

export default ProductTable