import React from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../helpers';

function AddToCart({ handleClose, cart, handleRemoveItem }) {
  return (
    <Modal>
      <div className="bg-white shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
          <h1 className="text-lg font-bold">
            Shopping Cart ({`${cart.items.length} ${cart.items.length > 1 ? 'items' : 'item'}`})
          </h1>
          <div onClick={handleClose} className="text-gray-600 cursor-pointer">
            X
          </div>
        </div>
        <div className="p-4 overflow-scroll h-64">
          {cart.items.map((item, index) => {
            return (
              <div key={item.id} className={`flex flex-col w-full ${cart.items.length !== index + 1 ? ' mb-4' : ''}`}>
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded object-contain mr-4"
                    src={item.product.images.length > 0 ? item.product.images[0] : ''}
                    alt={item.product.title}
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{item.product.title}</h2>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{`${item.quantity} ${
                        item.quantity > 1 ? 'units' : 'unit'
                      }`}</span>
                      <div className="flex justify-end gap-2">
                        <div className="text-gray-600 hover:text-red-500">{formatPrice(item.product.price)}</div>
                        <button onClick={() => handleRemoveItem(item.product)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-4 py-3 bg-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">{formatPrice(cart.totalValue)}</span>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2 pt-4">
            <Link className="border w-full rounded bg-black text-center p-2 text-white" to="/checkout">
              Checkout
            </Link>
            <Link className="border w-full rounded outline p-1 text-center text-black" to="/cart">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddToCart;
