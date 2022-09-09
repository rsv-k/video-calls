import type { TUser } from '@/types';
import {
	collection,
	setDoc,
	getFirestore,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const usersColRef = collection(db, 'users');

export const setUserOnline = (userId: string, data: Omit<TUser, 'userId'>) => {
	const user = doc(usersColRef, userId);

	return setDoc(user, {
		...data,
	});
};

export const setUserOffline = async () => {
	if (!auth.currentUser) {
		return;
	}

	const user = doc(usersColRef, auth.currentUser?.uid);

	await updateDoc(user, {
		status: 1,
	});
};
