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
import Confirmation from './pages/Confirmation';
import NotFound from './pages/NotFound';
import Dashboard from './pages/User/Dashboard';
import InnerLayout from './InnerLayout';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';

export const routeConfiguration = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: <Dashboard />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: false,
    isPublic: false,
  },
  {
    name: 'Orders',
    path: '/orders',
    component: <Orders />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: false,
    isPublic: false,
  },
  {
    name: 'Profile',
    path: '/profile',
    component: <Profile />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: false,
    isPublic: false,
  },
  {
    name: 'Not Found',
    path: '/404',
    component: <NotFound />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: true,
    isPublic: true,
  },
  {
    name: 'Payment Processing',
    path: '/payment-processing',
    component: <PaymentProcessor />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: true,
    isPublic: true,
  },
  {
    name: 'Confirm Order',
    path: '/confirmation',
    component: <Confirmation />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: true,
    isPublic: true,
  },
  {
    name: 'Support',
    path: '/support',
    component: <Static type="support" />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
    isPublic: true,
  },
  {
    name: 'Terms',
    path: '/terms',
    component: <Static type="terms" />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
    isPublic: true,
  },
  {
    name: 'Privacy',
    path: '/privacy',
    component: <Static type="privacy" />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
    isPublic: true,
  },
  {
    name: 'Login',
    path: '/login',
    component: <Login />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: true,
    isPublic: true,
  },
  {
    name: 'Cart',
    path: '/cart',
    component: <Cart />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: false,
    isPublic: true,
  },
  {
    name: 'Checkout',
    path: '/checkout',
    component: <Checkout />,
    isDynamicRoute: false,
    isAuthenticated: true,
    isFullScreen: false,
    isPublic: true,
  },
  {
    name: 'Product',
    path: '/product/:id',
    component: <ProductDetails />,
    isDynamicRoute: true,
    isAuthenticated: false,
    isFullScreen: false,
    isPublic: true,
  },
  {
    name: 'Home',
    path: '/',
    component: <Home />,
    isDynamicRoute: false,
    isAuthenticated: false,
    isFullScreen: true,
    isPublic: true,
  },
];

export default createBrowserRouter(
  routeConfiguration.map((config) => {
    if (config.isAuthenticated) {
      if (config.isPublic) {
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
          element: (
            <InnerLayout selectedNav={config.path.replace('/', '')} hideBreadcrumb={config.isFullScreen}>
              <ProtectedRoute path={config.path}>{config.component}</ProtectedRoute>
            </InnerLayout>
          ),
        };
      }
    } else {
      return {
        path: config.path,
        element: <Layout hideBreadcrumb={config.isFullScreen}>{config.component}</Layout>,
      };
    }
  })
);
