import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaRegUser, FaPowerOff } from 'react-icons/fa';
import { auth, db } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { signout } from '../../store';
import { clearStorage } from '../../sessionStorage';
import { Timestamp, doc, setDoc } from 'firebase/firestore';

function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });

  const authUser = useSelector((state) => {
    return state.auth;
  });

  const handleSignOut = async (e) => {
    e.preventDefault();
    if (cart.items.length > 0) {
      await setDoc(doc(db, 'carts', auth.currentUser.uid), { items: cart.items, timestamp: Timestamp.now() });
    }
    await signOut(auth);
    dispatch(signout());
    clearStorage();
  };
  return (
    <header className="bg-black text-white p-2 flex justify-between items-center shadow-sm">
      <Link to="/">
        <img src="/logo.png" width="100" alt="My Store" />
      </Link>
      <nav className="text-3xl flex gap-4 items-end">
        <Link to="/cart" className="flex flex-col items-end">
          <span className="text-xs">{cart.items.length}</span>
          <FaShoppingCart />
        </Link>
        <Link to="/dashboard">
          <FaRegUser />
        </Link>
        {authUser.authenticated && (
          <button onClick={handleSignOut}>
            <FaPowerOff />
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
