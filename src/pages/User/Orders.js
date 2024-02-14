import React from 'react';
import { useSelector } from 'react-redux';
import OrderList from '../../components/order/OrderList';

function Orders() {
  const user = useSelector((state) => state.user);
  return <OrderList orders={user.orders} title="Orders" isMainTitle={true} />;
}

export default Orders;
