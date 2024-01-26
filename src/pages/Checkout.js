import React from 'react';
import ShippingMethods from '../components/checkout/ShippingMethods';
import ShippingDetails from '../components/checkout/ShippingDetails';
import Product from '../components/checkout/Product';
import Steps from '../components/checkout/Steps';

function Checkout(props) {
  return (
    <div className="py-8">
      <Steps />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <Product />
            <Product />
          </div>

          <ShippingMethods />
        </div>
        <ShippingDetails />
      </div>
    </div>
  );
}

export default Checkout;
