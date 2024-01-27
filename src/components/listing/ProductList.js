import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import AddToCart from '../modal/AddToCart';
import { addItemToCart, removeItemFromCart } from '../../store';

function ProductList({ products }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cart;
  });

  const handleClose = () => {
    setShowModal(false);
  };

  const handleAddItemToCart = (product, quantity) => {
    dispatch(addItemToCart(product, quantity));
    setShowModal(true);
  };

  const handleRemoveItemToCart = (product) => {
    dispatch(removeItemFromCart(product));
    setShowModal(true);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => {
            return (
              <ProductItem
                key={product.id}
                cart={cart}
                product={product}
                handleAddItem={handleAddItemToCart}
                handleRemoveItem={handleRemoveItemToCart}
              />
            );
          })}
          {showModal && <AddToCart handleClose={handleClose} cart={cart} handleRemoveItem={handleRemoveItemToCart} />}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
