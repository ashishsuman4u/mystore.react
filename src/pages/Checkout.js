import React, { useState } from 'react';
import ShippingMethods from '../components/checkout/ShippingMethods';
import ShippingDetails from '../components/checkout/ShippingDetails';
import CartItem from '../components/checkout/CartItem';
import Steps from '../components/checkout/Steps';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress, updateOrderId, updateShipping } from '../store';
import RedirectToShop from '../components/modal/RedirectToShop';
import { generateCheckoutSession, saveData } from '../helpers';
import { removeData } from '../helpers';

function Checkout() {
  const [showShipping, setShowShipping] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const user = useSelector((state) => {
    return state.user;
  });
  const [showModal] = useState(cart.items.length === 0);

  const redirectToCheckout = async (userId, orderId) => {
    const session = await generateCheckoutSession({
      items: cart.items.map((item) => {
        return { id: item.id, quantity: item.quantity };
      }),
      callbackUrl: 'payment-processing',
      shippingType: cart.shippingType,
      address: cart.shippingAddress,
      userId,
      orderId,
    });
    if (session) {
      dispatch(updateOrderId(session.orderId));
      await removeData('carts', user.currentUser.uid);
      const stripe = window.Stripe(session.stripePublicKey);
      stripe.redirectToCheckout({
        sessionId: session.stripeCheckoutSessionId,
      });
    }
  };

  const handleAddress = async (address) => {
    console.log('address', address);
    setShowShipping(false);
    dispatch(updateAddress(address));
    if (address.saveAddress === 'yes') {
      await saveData('users', user.currentUser.uid, { ...user.currentUser, address });
    }
    await redirectToCheckout(user.currentUser.uid, cart.orderId);
  };

  const handleShipping = async (shippingType) => {
    dispatch(updateShipping(shippingType));
  };
  return (
    <>
      {showModal && <RedirectToShop />}
      <main className="py-8">
        <Steps showShipping={showShipping} />
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
            <ShippingDetails cart={cart} handleAddress={handleAddress} setShowShipping={setShowShipping} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Checkout;
