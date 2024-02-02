import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ProductItem({ product, cart, handleAddItem, handleRemoveItem }) {
  const isItemInCart = (productId) => {
    const item = cart.items.filter((c) => c.id === productId);
    return item.length !== 0;
  };
  const handleClick = () => {
    isItemInCart(product.id) ? handleRemoveItem(product) : handleAddItem(product, 1);
  };
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full lg:my-4">
      <Link to={`/product/${product.id}`} className="block relative h-72 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={product.images.length > 0 ? product.images[0] : ''}
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{product.category.name}</h3>
        <div className="flex justify-between h-14 gap-4 text-gray-900 title-font text-lg font-medium">
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </div>
        <button
          onClick={handleClick}
          className={`flex gap-4 items-center justify-center p-3 mt-2 border rounded  text-white w-full ${
            isItemInCart(product.id) ? 'bg-red-400' : 'bg-black'
          }`}
        >
          <FaShoppingCart className="text-3xl" />
          <span className="text-xl">{isItemInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
