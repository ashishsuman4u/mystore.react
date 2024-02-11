import { Firestore } from '@google-cloud/firestore';

// const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
// console.log(serviceAccount);

let decodedKey = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_PK, 'base64');

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: decodedKey.toString(),
  },
});

export async function getDocData(docPath) {
  const snap = await db.doc(docPath).get();
  return snap.data();
}
