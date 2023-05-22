import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { removeProduct, setCount } from 'store/reducers/cart';
import { ProductStoreType } from 'types';
import { RootState } from 'store';

const ShoppingCart = ({ thumb, name, id, color, size, count, price }: ProductStoreType) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState)  => state);
  if (typeof window !== 'undefined') {
    var userToken = localStorage.getItem('userID')
  }
  
  var userLoginToken = user.loggedInUser.id ? user.loggedInUser.id : userToken ? JSON.parse(userToken) : ''
  const removeFromCart = () => {
    const payload = {
      "productID": id,
      "userId": userLoginToken,
      quantity: count,
    }
    dispatch(removeProduct(payload))
  }
  const setProductCount = (count: number) => {
    if(count <= 0) {
      return;
    }

    const payload = {
      "productID": id,
      "userId": userLoginToken,
      quantity: count,
    }
    dispatch(setCount(payload))
  }

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td></td>
      <td>
        <div className="quantity-button">
          <button type="button" onClick={() => setProductCount(count - 1)} className="quantity-button__btn">
            -
          </button>
          <span>{ count }</span>
          <button type="button" onClick={() => setProductCount(count + 1)} className="quantity-button__btn">
            +
          </button>
        </div></td>
      <td></td>
      <td>${price}</td>
      <td className="cart-item-cancel"><i className="icon-cancel" onClick={() => removeFromCart()}></i></td>
    </tr>
  )
};

  
export default ShoppingCart