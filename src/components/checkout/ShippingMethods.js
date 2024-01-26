import React from 'react';

function ShippingMethods(props) {
  return (
    <>
      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <form className="mt-5 flex flex-col gap-4">
        <label
          className="free-checked:border-2 free-checked:border-gray-700 free-checked:bg-gray-50 rounded-lg border border-gray-300 p-4 w-full flex items-center justify-between cursor-pointer"
          for="free"
        >
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
          <input type="radio" name="shipping" id="free" className="w-5 h-5 accent-black" />
        </label>
        <label
          className="paid-checked:border-2 paid-checked:border-gray-700 paid-checked:bg-gray-50 rounded-lg border border-gray-300 p-4 w-full flex items-center justify-between cursor-pointer"
          for="paid"
        >
          <div className="ml-5">
            <span className="mt-2 font-semibold">Fedex Delivery</span>
            <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
          </div>
          <input type="radio" name="shipping" id="paid" className="w-5 h-5 accent-black" />
        </label>
      </form>
    </>
  );
}

export default ShippingMethods;
