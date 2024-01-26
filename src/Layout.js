import React from 'react';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import Breadcrumb from './components/global/Breadcrumb';
import ReactErrorBoundary from './components/error';

function Layout({ hideBreadcrumb, children }) {
  return (
    <ReactErrorBoundary>
      <Header />
      {!hideBreadcrumb && <Breadcrumb />}
      {children}
      <Footer />
    </ReactErrorBoundary>
  );
}

export default Layout;
