import { auth } from '../config/firebase';

export const generateCheckoutSession = async (data) => {
  const session = await fetch('/api/checkout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await auth.currentUser.getIdToken(),
    },
    body: JSON.stringify(data),
  });
  return session.json();
};
