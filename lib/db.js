import * as admin from 'firebase-admin';

let decodedKey = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_PK, 'base64');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: decodedKey.toString(),
  }),
});

export const db = admin.firestore();

export const verifyIdToken = async (token) => {
  const auth = admin.auth();
  return await auth.verifyIdToken(token);
};

export async function getDocData(docPath) {
  const snap = await db.doc(docPath).get();
  return snap.data();
}
