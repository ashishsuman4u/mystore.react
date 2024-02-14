import React from 'react';
import { formatPrice } from '../../helpers';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

export default function OrderList({ orders, title, isMainTitle }) {
  return (
    <div className="p-4 w-full">
      <h3 className={`text-gray-700 ${isMainTitle ? 'text-3xl' : 'text-2xl'} font-medium py-4`}>{title}</h3>
      <div className="py-5 min-h-screen">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                <th className="w-3/5 p-3 text-sm font-semibold tracking-wide text-left">Details</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => {
                return (
                  <tr key={order.id} className={index % 2 > 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Link
                        to={`/confirmation?orderid=${order.id}`}
                        className="font-bold text-blue-500 hover:underline"
                      >
                        # {order.id}
                      </Link>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-pre-wrap">
                      {order.items
                        .reduce((prev, curr) => {
                          return prev + `${curr.quantity} X ${curr.product.title}\n`;
                        }, '')
                        .replace(/,\s*$/, '')}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {dateFormat(new Date(order.orderDate), 'paddedShortDate')}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{formatPrice(order.totalValue)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {orders.map((order) => {
            return (
              <div key={order.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-sm">
                  <div>
                    <Link to={`/confirmation?orderid=${order.id}`} className="text-blue-500 font-bold hover:underline">
                      # {order.id}
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-500">{dateFormat(new Date(order.orderDate), 'paddedShortDate')}</div>
                  <div>
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {order.items
                    .reduce((prev, curr) => {
                      return prev + `${curr.quantity} X ${curr.product.title}\n`;
                    }, '')
                    .replace(/,\s*$/, '')}
                </div>
                <div className="text-sm font-medium text-black">{formatPrice(order.totalValue)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
