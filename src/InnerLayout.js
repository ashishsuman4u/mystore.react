import React from 'react';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import Breadcrumb from './components/global/Breadcrumb';
import ReactErrorBoundary from './components/error';
import Sidebar from './components/global/Sidebar';

function InnerLayout({ selectedNav, hideBreadcrumb, children }) {
  return (
    <ReactErrorBoundary>
      <div className="container mx-auto">
        <Header />
        {!hideBreadcrumb && <Breadcrumb />}
        <div className="flex">
          <Sidebar selectedNav={selectedNav} />
          {children}
        </div>
        <Footer />
      </div>
    </ReactErrorBoundary>
  );
}

export default InnerLayout;
