import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, updateQuantityInCart } from '../store';
import { formatPrice } from '../helpers';
import RedirectToShop from '../components/modal/RedirectToShop';
import CartItem from '../components/cart/CartItem';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });
  const [showModal] = useState(cart.items.length === 0);

  const handleQuantityDecrease = (cartItem) => {
    const quantity = cartItem.quantity - 1;
    if (quantity === 0) {
      dispatch(removeItemFromCart(cartItem.product));
    } else {
      dispatch(updateQuantityInCart(cartItem.product, quantity));
    }
  };
  const handleQuantityIncrease = (cartItem) => {
    const quantity = cartItem.quantity + 1;
    dispatch(updateQuantityInCart(cartItem.product, quantity));
  };

  const handleRemoveItemToCart = (product) => {
    dispatch(removeItemFromCart(product));
  };
  return (
    <>
      {showModal && <RedirectToShop />}
      <main className="h-auto py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-black">Your Cart</h1>
          </div>

          <div className="mx-auto mt-8 w-full md:mt-12">
            <div className="bg-white">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {cart.items.map((item) => {
                      return (
                        <CartItem
                          key={item.id}
                          item={item}
                          handleQuantityDecrease={handleQuantityDecrease}
                          handleQuantityIncrease={handleQuantityIncrease}
                          handleRemoveItemToCart={handleRemoveItemToCart}
                        />
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">{formatPrice(cart.totalValue)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">{formatPrice(cart.shippingValue)}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">USD</span>{' '}
                    {formatPrice(cart.totalValue + cart.shippingValue)}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    to="/checkout"
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Cart;
