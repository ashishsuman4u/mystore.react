import React from 'react';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import Breadcrumb from './components/global/Breadcrumb';
import ReactErrorBoundary from './components/error';
import Sidebar from './components/global/Sidebar';

function InnerLayout({ selectedNav, hideBreadcrumb, children }) {
  return (
    <ReactErrorBoundary>
      <Header />
      {!hideBreadcrumb && <Breadcrumb />}
      <div className="flex">
        <Sidebar selectedNav={selectedNav} />
        {children}
      </div>

      <Footer />
    </ReactErrorBoundary>
  );
}

export default InnerLayout;
