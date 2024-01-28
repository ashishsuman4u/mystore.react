import React from 'react';
import { FaRegAddressCard } from 'react-icons/fa';

function ShippingDetails({ handleAddress }) {
  const saveAddress = () => {
    const fullName = document.getElementById('fullName');
    const streetLine1 = document.getElementById('streetLine1');
    const streetLine2 = document.getElementById('streetLine2');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zip = document.getElementById('zip');
    const saveAddress = document.querySelector('input[name="address"]:checked').value;

    handleAddress({
      fullName: fullName.value,
      streetLine1: streetLine1.value,
      streetLine2: streetLine2.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      saveAddress,
    });
  };
  return (
    <>
      <p className="text-xl font-medium">Shipping Details</p>
      <p className="text-gray-400">Complete your order by providing your payment details.</p>
      <div className="py-4">
        <label for="fullName" className="mt-4 mb-2 block text-sm font-medium">
          Full Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="John Doe"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <FaRegAddressCard className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full">
            <label for="streetLine1" className="mt-4 mb-2 block text-sm font-medium">
              Street Line 1
            </label>
            <div className="relative ">
              <input
                type="text"
                id="streetLine1"
                name="streetLine1"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g. abc street"
              />
            </div>
          </div>
          <div className="w-full">
            <label for="streetLine2" className="mt-4 mb-2 block text-sm font-medium">
              Street Line 2
            </label>
            <div className="relative ">
              <input
                type="text"
                id="streetLine2"
                name="streetLine2"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g. block xyz"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="md:w-6/12 w-full">
            <label for="city" className="mt-4 mb-2 block text-sm font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. New York"
            />
          </div>
          <div className="md:w-3/12 w-full">
            <label for="state" className="mt-4 mb-2 block text-sm font-medium">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="md:w-3/12 w-full">
            <label for="zip" className="mt-4 mb-2 block text-sm font-medium">
              Zip
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="10001"
            />
          </div>
        </div>
        <div className="flex">
          <div className="lg:w-6/12 w-full">
            <label className="mt-4 mb-2 block text-sm font-medium">Save Address</label>
            <div className="flex items-center gap-8">
              <label className="inline-flex items-center">
                <input type="radio" checked="checked" name="address" className="w-5 h-5 accent-black" value="yes" />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="address" className="w-5 h-5 accent-black" value="no" />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={saveAddress}
        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
      >
        Proceed to Payment
      </button>
    </>
  );
}

export default ShippingDetails;
