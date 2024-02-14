import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../helpers';
function CartItem({ item, handleQuantityDecrease, handleQuantityIncrease, handleRemoveItemToCart }) {
  return (
    <li key={item.id} className="flex flex-col space-y-3 py-6 text-left md:flex-row gap-4 md:justify-between">
      <div className="flex gap-4">
        <img
          className="h-24 w-24 max-w-full rounded-lg object-cover"
          src={item.product.images.length > 0 ? item.product.images[0] : ''}
          alt={item.product.title}
        />
        <div className="">
          <p className="text-base font-semibold text-gray-900">{item.product.title}</p>
          <p className="mx-0 mt-1 mb-0 text-sm text-gray-400 uppercase">{item.product.category.name}</p>
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
          <p className="text-base font-semibold text-gray-900">{formatPrice(item.quantity * item.product.price)}</p>
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
}

export default CartItem;
