import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { initialiseCartFromDB, populateOrder, populateWishlist, signIn, updateAddress } from '../../store';
import { fetchAllUserData, fetchData } from '../../helpers';

function SignIn() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (user.currentUser) {
      navigate(location.state ?? '/', { replace: true });
    } else if (!user.currentUser && auth.currentUser) {
      dispatch(signIn(auth.currentUser));
      navigate(location.state ?? '/', { replace: true });
    }
  });

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await handleSignIn(result);
  };

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      await handleSignIn(result);
    } catch (error) {
      console.log(error);
      //TODO - Show errors
    }
  };

  async function handleSignIn(result) {
    dispatch(signIn(result.user));
    const cartItems = await fetchData('carts', result.user.uid, 'items');
    if (cartItems) {
      dispatch(initialiseCartFromDB(cartItems));
    }
    const orders = await fetchAllUserData('orders', result.user.uid);
    if (orders) {
      dispatch(populateOrder(orders));
    }
    const userData = await fetchData('users', result.user.uid);
    if (userData) {
      dispatch(updateAddress(userData.address));
      dispatch(populateWishlist(userData.wishlist));
    }
    navigate(location.state && location.state.returnUrl ? location.state.returnUrl : '/', { replace: true });
  }
  return (
    <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6">
      <h2 className="mt-2 text-center text-black text-2xl font-bold">Welcome to My Store</h2>
      <p className="mt-2 text-center text-black">please enter your details.</p>
      <button
        onClick={handleGoogleLogin}
        className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
      >
        <img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google Logo" /> Sign
        in with Google
      </button>
      <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
        <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
      </div>
      <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-bold text-center">Sign in</h3>
        <div className="flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <input
              type="email"
              id="email"
              className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Email"
              {...register('email', { required: true, maxLength: 100 })}
            />
          </div>
        </div>
        <div className="mb-12 flex flex-col pt-4">
          <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
            <input
              type="password"
              id="password"
              className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Password"
              {...register('password', { required: true, maxLength: 100 })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
        >
          Sign in
        </button>
      </form>
      <div className="py-12 text-center">
        <p className="whitespace-nowrap text-gray-600">
          Dont have an account?{' '}
          <a href="#" className="underline-offset-4 font-semibold text-gray-900 underline">
            Sign up.
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
