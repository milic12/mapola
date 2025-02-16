import serviceAccount from "./serviceaccount.json";
import * as firebaseAdmin from "firebase-admin";

const privateKey = serviceAccount.private_key;
const clientEmail = serviceAccount.client_email;
const projectId = serviceAccount.project_id;

if (!privateKey || !clientEmail || !projectId) {
  console.log(`Failed to load Firebase credentials.`);
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey,
      clientEmail,
      projectId,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export { firebaseAdmin };
