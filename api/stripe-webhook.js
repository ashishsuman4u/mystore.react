import { db, getDocData } from '../lib/db';
// import Stripe from 'stripe';

// const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(request, response) {
  try {
    if (request.method === 'POST') {
      // const rawBody = await getRawBody(request);
      // console.log('rawBody', rawBody);
      // const signature = request.headers['stripe-signature'];
      // const event = stripeClient.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
      if (request.body.type == 'checkout.session.completed') {
        const session = request.body.data.object;
        await onCheckoutSessionCompleted(session);
      }
      return response.json({ received: true });
    } else {
      return response.status(400).json({ message: 'Bad Request' });
    }
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: `Webhook Error: ${error.message}` });
  }
}

async function onCheckoutSessionCompleted(session) {
  const purchaseSessionId = session.client_reference_id;
  const { userId, orderId } = await getDocData(`purchaseSessions/${purchaseSessionId}`);
  await markOrderComplete(purchaseSessionId, orderId, userId, session.customer);
}

async function markOrderComplete(purchaseSessionId, orderId, userId, stripeCustomerId) {
  const batch = db.batch();
  const purchaseSession = db.doc(`purchaseSessions/${purchaseSessionId}`);
  batch.update(purchaseSession, { status: 'completed' });

  const order = db.doc(`orders/${orderId}`);
  batch.update(order, { status: 'completed' });

  const user = db.doc(`users/${userId}`);
  batch.set(user, { stripeCustomerId }, { merge: true });

  return batch.commit();
}
