import { getFirestore } from 'firebase-admin/firestore';
import { app } from './firebaseAdmin';

export const db = getFirestore(app);
