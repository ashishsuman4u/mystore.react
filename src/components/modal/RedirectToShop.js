import React from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';

function RedirectToShop() {
  return (
    <Modal>
      <div className="bg-white shadow-lg overflow-hidden">
        <div class="container flex items-center min-h-fit">
          <div class="flex flex-col items-center mx-auto text-center p-4 lg:p-8 xl:p-20">
            <p class="p-3 text-sm font-medium text-black rounded-full bg-gray-100 dark:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              OOPS! Looks like your cart is empty.
            </h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">Please proceed to home to start shopping.</p>

            <div class="flex items-center w-full mt-6">
              <Link
                to="/"
                class="w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-black rounded-lg shrink-0 hover:bg-gray-600 dark:hover:bg-gray-500 dark:bg-gray-600"
              >
                Take me home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default RedirectToShop;
