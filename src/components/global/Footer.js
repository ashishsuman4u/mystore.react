import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="text-white bg-black body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <img src="/favicon-32x32.png" alt="My Store" />
          <span className="ml-3 text-xl">My Store</span>
        </a>
        <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          &copy; {new Date().getFullYear()} My Store Pvt Ltd
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-white">
            <FaFacebookF />
          </a>
          <a className="ml-3 text-white">
            <FaTwitter />
          </a>
          <a className="ml-3 text-white">
            <FaInstagram />
          </a>
          <a className="ml-3 text-white">
            <FaLinkedin />
          </a>
        </span>
      </div>
      <p className="text-center py-4">
        Designed & Developed by{' '}
        <a rel="noreferrer" href="https://www.ashishsuman.co" target="_blank">
          Ashish Suman
        </a>
      </p>
    </footer>
  );
}

export default Footer;
