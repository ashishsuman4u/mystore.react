import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ErrorPage() {
  let navigate = useNavigate();
  return (
    <section class="bg-white dark:bg-gray-900 ">
      <div class="container flex items-center min-h-screen mx-auto">
        <div class="flex flex-col items-center mx-auto text-center">
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
            OOPS! Something went wrong.
          </h1>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Looks like we have got a problem to solve.</p>

          <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button
              onClick={() => navigate(-1)}
              class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:rotate-180"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span>Go back</span>
            </button>

            <Link
              to="/"
              class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-black rounded-lg shrink-0 sm:w-auto hover:bg-gray-600 dark:hover:bg-gray-500 dark:bg-gray-600"
            >
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
