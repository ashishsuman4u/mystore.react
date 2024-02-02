import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { removeItemFromCart, updateQuantityInCart } from '../store';
import { currencyFormatter } from '../helper/formatter';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cart;
  });

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
    <section className="h-auto py-12 sm:py-16 lg:py-20">
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
                      <li
                        key={item.id}
                        className="flex flex-col space-y-3 py-6 text-left md:flex-row gap-4 md:justify-between"
                      >
                        <div className="flex gap-4">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={item.product.images.length > 0 ? item.product.images[0] : ''}
                            alt={item.product.title}
                          />
                          <div className="">
                            <p className="text-base font-semibold text-gray-900">{item.product.title}</p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400 uppercase">
                              {item.product.category.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:items-end md:gap-8 lg:gap-20">
                          <div className="flex h-8 text-gray-600">
                            <button
                              onClick={() => handleQuantityDecrease(item)}
                              className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                            >
                              -
                            </button>
                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityIncrease(item)}
                              className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex flex-row items-center gap-2">
                            <p className="text-base font-semibold text-gray-900">
                              {currencyFormatter.format(item.quantity * item.product.price)}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleRemoveItemToCart(item.product)}
                              className=" text-center text-gray-500 focus:shadow hover:text-gray-900"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-900">{currencyFormatter.format(cart.totalValue)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg font-semibold text-gray-900">{currencyFormatter.format(cart.shippingValue)}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  <span className="text-xs font-normal text-gray-400">USD</span>{' '}
                  {currencyFormatter.format(cart.totalValue + cart.shippingValue)}
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
    </section>
  );
}

export default Cart;
