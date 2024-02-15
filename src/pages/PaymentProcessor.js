import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getRealtimeUpdate } from '../helpers';
import { resetCart } from '../store';
import { useDispatch } from 'react-redux';
import Loader from '../components/global/Loader';

function PaymentProcessor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPurchaseSession, setCurrentPurchaseSession] = useState(null);
  let [searchParams] = useSearchParams();
  const purchaseSession = searchParams.get('ongoingPurchaseSessionId');
  const purchaseResult = searchParams.get('purchaseResult');
  useEffect(() => {
    if (purchaseResult === 'failed') {
      navigate('/checkout');
    }
  });
  if (purchaseResult === 'success' && !currentPurchaseSession) {
    getRealtimeUpdate('purchaseSessions', purchaseSession, setCurrentPurchaseSession);
    dispatch(resetCart());
  }
  if (currentPurchaseSession) {
    navigate(`/confirmation/?orderid=${currentPurchaseSession.orderId}`);
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold pb-8 px-4 md:px-12 text-center">
        Hang tight! We&apos;re securely processing your payment to complete your order.
      </h2>
      <p className="pb-8 px-4 md:px-12 text-center">Thank you for your patience, we&apos;re almost there!</p>
      <Loader />
    </main>
  );
}

export default PaymentProcessor;
