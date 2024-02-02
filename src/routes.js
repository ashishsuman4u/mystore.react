import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import React from 'react';

export const routeConfiguration = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: <Home />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: false,
  },
  {
    name: 'Login',
    path: '/login',
    component: <Login />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: true,
  },
  {
    name: 'Cart',
    path: '/cart',
    component: <Cart />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
  },
  {
    name: 'Checkout',
    path: '/checkout',
    component: <Checkout />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
  },
  {
    name: 'Product',
    path: '/product/:id',
    component: <ProductDetails />,
    isDynamicRoute: true,
    isAuthenticated: false,
    isFullScreen: false,
  },
  {
    name: 'Home',
    path: '/',
    component: <Home />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: true,
  },
];

export default createBrowserRouter(
  routeConfiguration.map((config) => {
    return {
      path: config.path,
      element: <Layout hideBreadcrumb={config.isFullScreen}>{config.component}</Layout>,
    };
  })
);
