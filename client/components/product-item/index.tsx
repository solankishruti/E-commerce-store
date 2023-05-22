import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { addProductCart } from "../../redux/features/productSlice"
import { ProductTypeList } from 'types';
import {  getProductCart } from 'store/reducers/cart';

const ProductItem = ({ discount, images, id, name, price }: ProductTypeList) => {
  const dispatch = useDispatch();

  if (typeof window !== 'undefined') {
    var userToken = localStorage.getItem('userID')
  }
  const { user } = useSelector((state: RootState)  => state);
  var userLoginToken = user.loggedInUser.id ? user.loggedInUser.id : userToken ? JSON.parse(userToken) : ''
  const addToCart = async (productId) => {
    const productStore = {
      "userId": JSON.parse(userToken),
      "productId": productId,
      "quantity": 1
    }
    await dispatch(addProductCart(productStore));
    await dispatch(getProductCart(userLoginToken));
  }
  // const addToCart = () => {
  //   const productToSave: ProductStoreType = { 
  //     id: id,
  //     name: name,
  //     thumb: images ? images[0] : '',
  //     price: price,
  //     count: 1,
  //     color: color,
  //     size: itemSize
  //   }

  //   const productStore = {
  //     count,
  //     product: productToSave
  //   }

  //   dispatch(addProduct(productStore));
  // }

  return (
    <div className="product-item">
      <div className="product__image">
          <a>
            
            <img src={images} alt="product" />
            {discount && 
              <span className="product__discount">{discount}%</span>
            }
          </a>
      </div>
      
      <div className="product__description">
        <div className="product_name_price">
          <h3>{name}</h3>
          <div className={"product__price " + ("" ? 'product__price--discount' : '')} >
            <h4>${ price }</h4>

            {discount &&  
              <span>${ price }</span>
            }
          </div>
        </div>
        <button type="submit" onClick={() => addToCart(id)} className="btn btn--rounded btn--yellow">Add to cart</button>

      </div>
    </div>
  )
};


export default ProductItem