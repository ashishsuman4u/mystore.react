import { Firestore } from '@google-cloud/firestore';

// const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
// console.log(serviceAccount);
export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATEKEY,
  },
});

export async function getDocData(docPath) {
  const snap = await db.doc(docPath).get();
  return snap.data();
}
