import React from 'react';

function PaymentProcessor() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold pb-8 px-4 md:px-12 text-center">
        Hang tight! We&apos;re securely processing your payment to complete your order.
      </h2>
      <p className="pb-8 px-4 md:px-12 text-center">Thank you for your patience, we&apos;re almost there!</p>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-black animate-spin"></div>
      </div>
    </main>
  );
}

export default PaymentProcessor;
