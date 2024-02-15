import Stripe from 'stripe';
import products from '../dataset/products.json';
import { db, getDocData, verifyIdToken } from '../lib/db';
import { Timestamp } from 'firebase-admin/firestore';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

// const request.body = {
//   items: [{
//     id: "",
//     quantity: 1
//   }]
//   callbackUrl: '',
//   address: {},
//   shippingType: "",
//   userId: '',
//   orderId: ''
// };

export default async function handler(request, response) {
  try {
    if (request.method === 'POST') {
      const result = await verifyIdToken(request.headers.authorization);
      if (result.uid === request.body.userId) {
        let order = null;
        if (request.body.orderId) {
          order = await getDocData(`orders/${request.body.orderId}`);
        }
        if (!order) {
          order = await db.collection('orders').doc();
        }
        const user = await getDocData(`users/${request.body.userId}`);
        if (user && order) {
          const purchaseSession = await db.collection('purchaseSessions').doc();

          const checkoutSessionData = {
            status: 'ongoing',
            created: Timestamp.now(),
            userId: request.body.userId,
            orderId: order.id,
            stripeCustomerId: user.stripeCustomerId ?? '',
          };

          await purchaseSession.set(checkoutSessionData);
          const orderItems = request.body.items.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return {
              ...item,
              product: { ...product, images: product.images.split(',') },
            };
          });
          await saveOrder(order, orderItems, request.body, user);
          const sessionConfig = setupPurchaseSession(user, orderItems, request.body, purchaseSession.id);
          const session = await stripeClient.checkout.sessions.create(sessionConfig);

          return response.status(200).json({
            stripeCheckoutSessionId: session.id,
            stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
          });
        }
      } else {
        return response.status(401).json({ message: 'Unauthorized' });
      }
    }
    return response.status(400).json({ message: 'Bad Request' });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: 'Bad Request' });
  }
}

async function saveOrder(order, orderItems, reqBody, user) {
  const orderData = {
    items: orderItems,
    userId: user.uid,
    email: user.email,
    shippingAddress: reqBody.address,
    shippingType: reqBody.shippingType,
    shippingValue:
      reqBody.shippingType === 'Standard'
        ? parseInt(process.env.REACT_APP_STANDARD_SHIPPING_COST)
        : parseInt(process.env.REACT_APP_EXPRESS_SHIPPING_COST),
    status: 'payment-awaited',
    totalValue: orderItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0),
    orderDate: Date.now(),
  };
  await order.set(orderData);
}

function setupPurchaseSession(user, orderItems, reqBody, sessionId) {
  const config = setupBaseSessionConfig(user, reqBody, sessionId);
  config.line_items = orderItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        unit_amount: item.product.price * 100,
        product_data: {
          name: item.product.title,
          description: item.product.description,
          images: item.product.images,
        },
      },
      quantity: item.quantity,
    };
  });
  return config;
}

function setupBaseSessionConfig(user, reqBody, sessionId) {
  const config = {
    payment_method_types: ['card'],
    success_url: `${process.env.STRIPE_CALLBACK_URL}/?purchaseResult=success&ongoingPurchaseSessionId=${sessionId}`,
    cancel_url: `${process.env.STRIPE_CALLBACK_URL}/?purchaseResult=failed`,
    client_reference_id: sessionId,
    mode: 'payment',
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: `Fedex ${reqBody.shippingType} shipping`,
          fixed_amount: {
            amount:
              reqBody.shippingType === 'Standard'
                ? parseInt(process.env.REACT_APP_STANDARD_SHIPPING_COST) * 100
                : parseInt(process.env.REACT_APP_EXPRESS_SHIPPING_COST) * 100,
            currency: 'usd',
          },
          type: 'fixed_amount',
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
  };
  if (user.stripeCustomerId) {
    config.customer = user.stripeCustomerId;
  } else {
    config.customer_email = user.email;
    config.customer_creation = 'always';
  }
  return config;
}
