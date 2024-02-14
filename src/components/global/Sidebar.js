import React from 'react';
import { FaBox, FaChartPie, FaEdit, FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { saveData } from '../../helpers';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../store';
import { clearStorage } from '../../storage';

function Sidebar({ selectedNav }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const handleSignOut = async (e) => {
    e.preventDefault();

    if (cart.items.length > 0) {
      await saveData('carts', auth.currentUser.uid, { items: cart.items });
    }
    await signOut(auth);
    dispatch(signout());
    clearStorage();
    navigate('/');
  };
  return (
    //fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-gray-200 lg:static lg:inset-0
    <div className="w-18 lg:w-52">
      <nav className="mt-10">
        <Link
          to="/dashboard"
          className={
            selectedNav === 'dashboard'
              ? 'flex items-center px-3 lg:px-4 py-2 mt-4 text-gray-900 bg-gray-300 bg-opacity-25'
              : 'flex items-center px-3 lg:px-4 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
          }
        >
          <FaChartPie className="text-xl" />
          <span className="lg:mx-3 hidden lg:block">Dashboard</span>
        </Link>

        <Link
          to="/orders"
          className={
            selectedNav === 'orders'
              ? 'flex items-center px-3 lg:px-4 py-2 mt-4 text-gray-900 bg-gray-300 bg-opacity-25'
              : 'flex items-center px-3 lg:px-4 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
          }
        >
          <FaBox className="text-xl" />
          <span className="lg:mx-3 hidden lg:block">Orders</span>
        </Link>

        <Link
          to="/profile"
          className={
            selectedNav === 'profile'
              ? 'flex items-center px-3 lg:px-4 py-2 mt-4 text-gray-900 bg-gray-300 bg-opacity-25'
              : 'flex items-center px-3 lg:px-4 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
          }
        >
          <FaEdit className="text-xl" />
          <span className="lg:mx-3 hidden lg:block">Edit Profile</span>
        </Link>

        <a
          className="flex items-center px-3 lg:px-4 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 cursor-pointer"
          onClick={handleSignOut}
        >
          <FaPowerOff className="text-xl" />
          <span className="lg:mx-3 hidden lg:block">Logout</span>
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
