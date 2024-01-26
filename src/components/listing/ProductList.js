import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import AddToCart from '../modal/AddToCart';

function ProductList({ products }) {
  const [showModal, setShowModal] = useState(false);

  const productList = useSelector((state) => {
    return state;
  });
  console.log('productList', productList);

  const handleClose = () => {
    setShowModal(false);
  };

  const addItemToCart = (product) => {
    console.log(product);
    setShowModal(true);
  };

  const modal = <AddToCart handleClose={handleClose} />;
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => {
            return <ProductItem key={product.id} product={product} addItemToCart={addItemToCart} />;
          })}
          {showModal && modal}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
