import { App, cert, getApp, getApps, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

if (!getApps().length) {
  const decodedKey = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_KEY_BASE64!, "base64").toString("utf-8")
  ) as ServiceAccount;

  app = initializeApp({
    credential: cert(decodedKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
