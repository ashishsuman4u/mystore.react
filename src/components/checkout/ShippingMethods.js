import React from 'react';

function ShippingMethods({ cart, handleChange }) {
  return (
    <>
      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <form className="mt-5 flex flex-col gap-4">
        <label
          className="standard-checked:border-2 standard-checked:border-gray-700 standard-checked:bg-gray-50 rounded-lg border border-gray-300 p-4 w-full flex items-center justify-between cursor-pointer"
          htmlFor="standard"
        >
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Standard</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 7-10 Days</p>
          </div>
          <input
            type="radio"
            name="shipping"
            id="standard"
            className="w-5 h-5 accent-black"
            value="Standard"
            checked={cart.shippingType === 'Standard'}
            onChange={() => handleChange('Standard')}
          />
        </label>
        <label
          className="express-checked:border-2 express-checked:border-gray-700 express-checked:bg-gray-50 rounded-lg border border-gray-300 p-4 w-full flex items-center justify-between cursor-pointer"
          htmlFor="express"
        >
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Express</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
          <input
            type="radio"
            name="shipping"
            id="express"
            className="w-5 h-5 accent-black"
            value="Express"
            checked={cart.shippingType === 'Express'}
            onChange={() => handleChange('Express')}
          />
        </label>
      </form>
    </>
  );
}

export default ShippingMethods;
