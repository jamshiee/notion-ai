import { App, cert, getApp, getApps, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceKey from "./secret_key/firebase_service_key.json";

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey as ServiceAccount),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app)
export {app as adminApp,adminDb}