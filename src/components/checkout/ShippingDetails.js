import React, { useEffect } from 'react';
import { FaRegAddressCard } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

function ShippingDetails({ cart, handleAddress }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      ...cart.shippingAddress,
    },
  });
  useEffect(() => {
    reset({ ...cart.shippingAddress });
  }, [cart.shippingAddress, reset]);
  const onSubmit = (data) => {
    handleAddress(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-xl font-medium">Shipping Details</p>
      <p className="text-gray-400">Complete your order by providing your payment details.</p>
      <div className="py-4">
        <label htmlFor="fullName" className="mt-4 mb-2 block text-sm font-medium">
          Full Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g. John Doe"
            {...register('fullName', { required: true, maxLength: 50 })}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <FaRegAddressCard className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-full">
            <label htmlFor="streetLine1" className="mt-4 mb-2 block text-sm font-medium">
              Street Line 1
            </label>
            <div className="relative ">
              <input
                type="text"
                id="streetLine1"
                name="streetLine1"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g. abc street"
                {...register('streetLine1', {
                  required: true,
                  maxLength: 160,
                })}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="streetLine2" className="mt-4 mb-2 block text-sm font-medium">
              Street Line 2
            </label>
            <div className="relative ">
              <input
                type="text"
                id="streetLine2"
                name="streetLine2"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g. block xyz"
                {...register('streetLine2', { maxLength: 160 })}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="md:w-6/12 w-full">
            <label htmlFor="city" className="mt-4 mb-2 block text-sm font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. New York"
              {...register('city', { required: true, maxLength: 100 })}
            />
          </div>
          <div className="md:w-3/12 w-full">
            <label htmlFor="state" className="mt-4 mb-2 block text-sm font-medium">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="e.g. NY"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              {...register('state', { required: true, maxLength: 100 })}
            />
          </div>
          <div className="md:w-3/12 w-full">
            <label htmlFor="zip" className="mt-4 mb-2 block text-sm font-medium">
              Zip
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. 10001"
              {...register('zip', {
                required: true,
                minLength: 4,
                maxLength: 6,
              })}
            />
          </div>
        </div>
        <div className="flex">
          <div className="lg:w-6/12 w-full">
            <label className="mt-4 mb-2 block text-sm font-medium">Save as Default Address</label>
            <div className="flex items-center gap-8">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="address"
                  className="w-5 h-5 accent-black"
                  value="yes"
                  {...register('saveAddress', {
                    required: true,
                  })}
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="address"
                  className="w-5 h-5 accent-black"
                  value="no"
                  {...register('saveAddress', {
                    required: true,
                  })}
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
        Proceed to Payment
      </button>
    </form>
  );
}
export default ShippingDetails;
