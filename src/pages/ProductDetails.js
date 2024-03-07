import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart, FaHeart } from 'react-icons/fa';
import {
  addItemToCart,
  addWishlistItem,
  removeItemFromCart,
  removeWishlistItem,
  useFetchProductByIDQuery,
} from '../store';
import Loader from '../components/global/Loader';
import ErrorPage from '../components/error/ErrorPage';
import { useDispatch, useSelector } from 'react-redux';
import AddToCart from '../components/modal/AddToCart';

function ProductDetails() {
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
  const isItemInCart = (productId) => {
    const item = cart.items.filter((c) => c.id === productId);
    return item.length !== 0;
  };
  const handleClick = (product) => {
    isItemInCart(product.id) ? handleRemoveItemToCart(product) : handleAddItemToCart(product, 1);
  };
  let { id } = useParams();
  const user = useSelector((state) => state.user);
  const isWishListed = user.wishlist.find((w) => w.id === id);
  const [currentImage, setCurrentImage] = useState('');
  const handleWishlisting = async (product) => {
    if (isWishListed) {
      dispatch(removeWishlistItem(product));
    } else {
      dispatch(addWishlistItem(product));
    }
  };
  const { data, error, isFetching } = useFetchProductByIDQuery(id);
  if (isFetching) {
    return (
      <div className="flex align-middle items-center w-full justify-center h-screen">
        <Loader />
      </div>
    );
  } else if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <main className="text-black body-font overflow-hidden">
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
              {user.authenticated && (
                <div className="flex items-center">
                  {isWishListed ? <span>Remove from Wishlist</span> : <span>Add to Wishlist</span>}
                  <button
                    onClick={() => handleWishlisting(data)}
                    className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ${
                      isWishListed ? 'text-red-500 bg-red-200' : 'text-gray-500 bg-gray-200'
                    } ml-4`}
                  >
                    <FaHeart />
                  </button>
                </div>
              )}
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">${data.price}</span>
              <button
                className="flex gap-4 items-center ml-auto text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded"
                onClick={() => {
                  handleClick(data);
                }}
              >
                <FaShoppingCart className="text-3xl" />
                <span className="text-xl">{isItemInCart(data.id) ? 'Remove from Cart' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <AddToCart handleClose={handleClose} cart={cart} handleRemoveItem={handleRemoveItemToCart} />}
    </main>
  );
}

export default ProductDetails;
