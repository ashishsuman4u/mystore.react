import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData } from '../helpers';
import Loader from '../components/global/Loader';
import { useDispatch } from 'react-redux';
import { addOrder } from '../store';
import OrderDetails from '../components/order/OrderDetails';

function Confirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderid');
  const [order, setOrder] = useState({ loading: true });
  const handleOrder = useCallback(
    (data) => {
      if (data) {
        setOrder({ id: orderId, ...data }), dispatch(addOrder({ id: orderId, ...data }));
      } else {
        setOrder(null);
      }
    },
    [orderId, dispatch]
  );
  useEffect(() => {
    if (orderId) {
      fetchData('orders', orderId, null).then((data) => handleOrder(data));
    }
  }, [orderId, handleOrder]);
  if (!order) {
    return navigate('/404');
  }
  if (order.loading) {
    return (
      <div className="flex align-middle items-center w-full justify-center h-screen">
        <Loader />
      </div>
    );
  }
  return <OrderDetails order={order} />;
}

export default Confirmation;
