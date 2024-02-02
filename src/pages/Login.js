import React from 'react';
import SignIn from '../components/auth/SignIn';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function Login() {
  return (
    <div className="flex flex-wrap min-h-screen h-full">
      <div className="flex w-full flex-col md:w-1/2">
        <SignIn />
      </div>
      <div className="pointer-events-none relative hidden select-none bg-black md:block md:w-1/2">
        <div className="absolute bottom-4 xl:bottom-28 lg:bottom-16 z-10 px-8 text-white opacity-100">
          <p className="mb-8 text-base xl:text-3xl lg:text-2xl md:text-xl font-semibold leading-6">
            <FaQuoteLeft />
            At My Store, our mission is to redefine the online shopping experience for fashion enthusiasts. We are
            dedicated to curating a diverse and stylish collection of clothing, offering our customers a seamless and
            inspiring platform to express their unique sense of style. Committed to providing unparalleled quality,
            trendsetting designs, and exceptional customer service, we aim to empower individuals to confidently embrace
            their fashion journey. With a focus on innovation, sustainability, and inclusivity, we strive to be the
            go-to destination for fashion-forward individuals seeking curated, on-trend apparel that effortlessly
            complements their lifestyle.
            <FaQuoteRight />
          </p>
          <p className="mb-4 text-3xl font-semibold">John Doe</p>
          <p className="">Founder, My Store</p>
        </div>
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="cloudy mountains"
        />
      </div>
    </div>
  );
}

export default Login;
