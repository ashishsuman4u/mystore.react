import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaRegUser, FaPowerOff } from 'react-icons/fa';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { signIn, signout } from '../../store';
import { clearStorage } from '../../storage';
import { saveData, updateCollectionData } from '../../helpers';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (!user.currentUser && auth.currentUser) {
      dispatch(signIn(auth.currentUser));
    }
  }, [user.currentUser, dispatch]);

  const handleSignOut = async (e) => {
    e.preventDefault();

    if (cart && cart.items && cart.items.length > 0) {
      await saveData('carts', auth.currentUser.uid, { items: cart.items });
    }
    if (user && user.wishlist && user.wishlist.length > 0) {
      await updateCollectionData('users', auth.currentUser.uid, { wishlist: user.wishlist });
    }
    await signOut(auth);
    dispatch(signout());
    clearStorage();
    navigate('/');
  };
  return (
    <header className="bg-black text-white p-2 flex justify-between items-center shadow-sm">
      <Link to="/">
        <img src="/logo.png" width="100" alt="My Store" />
      </Link>
      <nav className="text-3xl flex gap-4 items-end">
        <Link to="/cart" className="flex flex-col items-end">
          <span className="text-xs">{cart.items.reduce((acc, cur) => acc + cur.quantity, 0)}</span>
          <FaShoppingCart />
        </Link>
        <Link to="/dashboard">
          <FaRegUser />
        </Link>
        {user.authenticated && (
          <button onClick={handleSignOut}>
            <FaPowerOff />
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
