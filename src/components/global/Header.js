import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaRegUser } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-black text-white p-2 flex justify-between items-center shadow-sm">
      <Link to="/">
        <img src="/logo.png" width="100" alt="My Store" />
      </Link>
      <nav className="text-3xl flex gap-4">
        <Link to="/"></Link>
        <Link to="/cart">
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
