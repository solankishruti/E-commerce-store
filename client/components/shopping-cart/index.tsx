import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getProductCart } from "../../store/reducers/cart"
import CheckoutStatus from '../../components/checkout-status';
import Item from './item';
import { RootState } from 'store';
import { useRouter } from 'next/router';

const ShoppingCart = () => {3
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState)  => state);
  const { isLoading } = useSelector((state: RootState)  => state.cart);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    var userToken = localStorage.getItem('userID')
    if(!userToken){
      router.push('/login')
    }
  }
  var userLoginToken = user.loggedInUser.id ? user.loggedInUser.id : userToken ? JSON.parse(userToken) : ''
  useEffect(() => {
    dispatch(getProductCart(userLoginToken));
  },[]);

  const { cartItems } = useSelector((state: RootState)  => state.cart);
  const priceTotal = () => {
    let totalPrice = 0;
    if(cartItems && cartItems.items?.length > 0) {      
      cartItems.items.map(item => totalPrice += item.productId.price * item.quantity);
    }
    return totalPrice;
  }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems?.items?.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}>Product</th>
                  <th></th>
                  <th>Amount</th>
                  <th></th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {cartItems.items.map(item => (
                  <Item 
                    key={item.productId._id}
                    id={item.productId._id}
                    thumb={item.productId.image}
                    name={item.productId.title}
                    color={item.color}
                    price={item.productId.price}
                    size={item.size}
                    count={item.quantity}
                  />
                ))}
              </tbody>
            </table> 
          } 
          
          {!cartItems?.items?.length && !isLoading && 
            <p>Nothing in the cart</p>
          }
          {isLoading && 
            <p>Loading...</p>
          }
        </div>
      
        <div className="cart-actions">
          <a href="/" className="cart__btn-back"><i className="icon-left"></i> Continue Shopping</a>
          {/* <input type="text" placeholder="Promo Code" className="cart__promo-code" /> */}

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Total cost <strong>${priceTotal().toFixed(2)}</strong></p>
            {/* <a href="/cart/checkout" className="btn btn--rounded btn--yellow">Checkout</a> */}
          </div>
        </div>
      </div>
    </section>
  )
};

  
export default ShoppingCart