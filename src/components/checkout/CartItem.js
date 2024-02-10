import React from 'react';
import { formatPrice } from '../../helpers/formatter';

function CartItem({ item }) {
  return (
    <div className="flex flex-row gap-4 items-center rounded-lg bg-white sm:flex-row">
      <img
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={item.product.images.length > 0 ? item.product.images[0] : ''}
        alt={item.product.title}
      />
      <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col">
          <span className="font-semibold">{item.product.title}</span>
          <span className=" text-gray-400 uppercase">{item.product.category.name}</span>
        </div>
        <p className="text-md font-bold">
          {item.quantity} X {formatPrice(item.product.price)}
        </p>
      </div>
    </div>
  );
}

export default CartItem;
