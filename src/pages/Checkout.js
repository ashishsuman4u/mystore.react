import React, { useState } from 'react';
import ShippingMethods from '../components/checkout/ShippingMethods';
import ShippingDetails from '../components/checkout/ShippingDetails';
import CartItem from '../components/checkout/CartItem';
import Steps from '../components/checkout/Steps';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress, updateShipping } from '../store';
import PaymentDetails from '../components/checkout/PaymentDetails';
import RedirectToShop from '../components/modal/RedirectToShop';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
// import { currencyFormatter } from '../helper/formatter';

function Checkout() {
  const [showShipping, setShowShipping] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const auth = useSelector((state) => {
    return state.auth;
  });
  const [showModal] = useState(cart.items.length === 0);
  if (auth.currentUser && !cart.shippingAddress?.fullName) {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((user) => {
      if (user.exists()) {
        dispatch(updateAddress(user.get('address')));
      }
    });
  }

  const handleAddress = async (address) => {
    dispatch(updateAddress(address));
    if (address.saveAddress === 'yes') {
      setDoc(doc(db, 'users', auth.currentUser.uid), {
        address,
      }).then((user) => {
        console.log(user);
      });
    }
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
  return (
    <>
      {showModal && <RedirectToShop />}
      <main className="py-8">
        <Steps showShipping={showShipping} setShowShipping={setShowShipping} />
        <div className="flex flex-col lg:flex-row">
          <div className="px-4 pt-8 lg:w-1/2">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cart.items.map((item) => {
                return <CartItem key={item.id} item={item} />;
              })}
            </div>

            <ShippingMethods cart={cart} handleChange={handleShipping} />
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 lg:w-1/2">
            {showShipping && (
              <ShippingDetails cart={cart} handleAddress={handleAddress} setShowShipping={setShowShipping} />
            )}
            {!showShipping && <PaymentDetails />}
          </div>
        </div>
      </main>
    </>
  );
}

export default Checkout;
