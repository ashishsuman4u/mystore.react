import React, { useState } from 'react';
import ShippingMethods from '../components/checkout/ShippingMethods';
import ShippingDetails from '../components/checkout/ShippingDetails';
import CartItem from '../components/checkout/CartItem';
import Steps from '../components/checkout/Steps';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress, updateShipping } from '../store';
import PaymentDetails from '../components/checkout/PaymentDetails';
import RedirectToShop from '../components/modal/RedirectToShop';
// import { currencyFormatter } from '../helper/formatter';

function Checkout(props) {
  const [showShipping, setShowShipping] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const [showModal] = useState(cart.items.length === 0);

  const handleAddress = (address) => {
    dispatch(updateAddress(address));
    setShowShipping(false);
  };

  const handleShipping = (shippingType) => {
    dispatch(
      updateShipping({
        shippingType,
        shippingValue:
          shippingType === 'Standard'
            ? parseInt(process.env.REACT_APP_STANDARD_SHIPPING_COST)
            : parseInt(process.env.REACT_APP_EXPRESS_SHIPPING_COST),
      })
    );
  };

  // const totalCartValue = cart.reduce((sum, item) => {
  //   return sum + item.product.price * item.quantity;
  // }, 0);
  return (
    <>
      {showModal && <RedirectToShop />}
      <div className="py-8">
        <Steps showShipping={showShipping} setShowShipping={setShowShipping} />
        <div className="flex flex-col lg:flex-row">
          <div className="px-4 pt-8 lg:w-1/2">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cart.items.map((item) => {
                return <CartItem item={item} />;
              })}
            </div>

            <ShippingMethods cart={cart} handleChange={handleShipping} />
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 lg:w-1/2">
            {showShipping && <ShippingDetails handleAddress={handleAddress} setShowShipping={setShowShipping} />}
            {!showShipping && <PaymentDetails />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
