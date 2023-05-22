import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getProductThunk } from "../../../redux/features/productSlice"
import { ProductTypeList } from 'types';
import ProductItem from 'components/product-item';

const ProductsContent = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getProductThunk());
  },[]);
  return (
    <>
      {productList &&
        <section className="products-list">
          {productList.map((item: ProductTypeList)  => (
            <ProductItem 
              id={item._id} 
              name={item.title}
              price={item.price}
              key={item._id}
              images={item.image} 
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent