import { useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import useOnClickOutside from 'use-onclickoutside';
import Logo from '../../assets/icons/logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getProductCart } from "../../store/reducers/cart"
import { RootState } from 'store';

type HeaderType = {
  isErrorPage?: Boolean;
}

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState)  => state);
  if (typeof window !== 'undefined') {
    var userToken = localStorage.getItem('userID')
  }
  var userLoginToken = user.loggedInUser?.id ? user.loggedInUser.id : userToken ? JSON.parse(userToken) : ''
  useEffect(() => {
    dispatch(getProductCart(userLoginToken));
  },[]);
  const { cartItems } = useSelector((state: RootState)  => state.cart);

  const arrayPaths = ['/'];  
  const [onTop, setOnTop] = useState(( !arrayPaths.includes(router.pathname) || isErrorPage ) ? false : true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const headerClass = () => {
    if(window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  }

  useEffect(() => {
    if(!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function() {
      headerClass();
    };
  }, []);

  return(
    <header className={`site-header ${!onTop ? 'site-header--fixed' : 'site-header--fixed'}`}>
      <div className="container">
        <Link href="/">
          <a><h1 className="site-logo"><Logo />E-Shop</h1></a>
        </Link>
        <nav ref={navRef} className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}>
        </nav>

        <div className="site-header__actions">
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems?.items?.length > 0 && 
                <span className="btn-cart__count">{cartItems?.items?.length}</span>
              }
            </button>
          </Link>
          {user?.loggedInUser?.username &&
            <>
              <div className='user-name-wrapper'>
                <button className="site-header__btn-avatar"><i className="icon-avatar"></i></button>
                <p className=''>{user?.loggedInUser?.username }</p>
              </div>
              
            </>
          }
          {!user?.loggedInUser?.username &&
            <>
              <Link href="/login">
              <button className="site-header__btn-avatar"><i className="icon-avatar"></i></button>
            </Link>
            </>
          }
          <button 
            onClick={() => setMenuOpen(true)} 
            className="site-header__btn-menu">
            <i className="btn-hamburger"><span></span></i>
          </button>
        </div>
      </div>
    </header>
  )
};


export default Header;
