import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaRegUser } from 'react-icons/fa';

function Header() {
  const cart = useSelector((state) => {
    return state.cart;
  });
  return (
    <header className="bg-black text-white p-2 flex justify-between items-center shadow-sm">
      <Link to="/">
        <img src="/logo.png" width="100" alt="My Store" />
      </Link>
      <nav className="text-3xl flex gap-4 items-end">
        <Link to="/cart" className="flex flex-col items-end">
          <span className="text-xs">{cart.length}</span>
          <FaShoppingCart />
        </Link>
        <Link to="/user">
          <FaRegUser />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
