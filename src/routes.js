import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Static from './pages/Static';
import Login from './pages/Login';
import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import PaymentProcessor from './pages/PaymentProcessor';

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
    name: 'Payment Processing',
    path: '/payment-processing',
    component: <PaymentProcessor />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: true,
  },
  {
    name: 'Support',
    path: '/support',
    component: <Static type="support" />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
  },
  {
    name: 'Terms',
    path: '/terms',
    component: <Static type="terms" />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
  },
  {
    name: 'Privacy',
    path: '/privacy',
    component: <Static type="privacy" />,
    isDynamicRoute: false,
    isAuthenticated: false,
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
    isAuthenticated: true,
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
    if (config.isAuthenticated) {
      return {
        path: config.path,
        element: (
          <Layout hideBreadcrumb={config.isFullScreen}>
            <ProtectedRoute path={config.path}>{config.component}</ProtectedRoute>
          </Layout>
        ),
      };
    } else {
      return {
        path: config.path,
        element: <Layout hideBreadcrumb={config.isFullScreen}>{config.component}</Layout>,
      };
    }
  })
);
