import React, { useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useFetchProductByIDQuery } from '../store';

function ProductDetails({ hideBreadcrumb }) {
  let { id } = useParams();
  if (!parseInt(id)) {
    redirect('/');
  }
  const [currentImage, setCurrentImage] = useState('');
  const { data, error, isFetching } = useFetchProductByIDQuery(id);
  if (isFetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error...</div>;
  }
  return (
    <>
      <section className="text-black body-font overflow-hidden">
        <div className="container px-5 py-12 lg:py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full flex flex-col gap-2">
              <img
                alt={data.title}
                className="lg:h-auto h-128 object-cover object-center rounded"
                src={currentImage !== '' ? currentImage : data.images && data.images.length > 0 ? data.images[0] : ''}
              />
              <div className="flex gap-2 items-center justify-center">
                {data.images &&
                  data.images.length > 0 &&
                  data.images.map((image) => {
                    return (
                      <img
                        key={image}
                        src={image}
                        width={100}
                        alt={data.title}
                        onClick={(e) => setCurrentImage(e.target.src)}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{data.category.name}</h2>
              <h1 className="text-black text-3xl title-font font-medium mb-1">{data.title}</h1>
              <div className="flex mb-4">
                <span className="flex gap-2 py-2">
                  <a className="text-gray-500">
                    <FaFacebookF />
                  </a>
                  <a className="text-gray-500">
                    <FaTwitter />
                  </a>
                  <a className="text-gray-500">
                    <FaInstagram />
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{data.description}</p>
              <div className="flex mt-6 justify-between items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span>Add to Wishlist</span>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <FaHeart />
                  </button>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">${data.price}</span>
                <button className="flex gap-4 items-center ml-auto text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded">
                  <FaShoppingCart className="text-3xl" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
