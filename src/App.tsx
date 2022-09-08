import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth, setUserOffline, setUserOnline } from '@/configs/firebase';
import { Home } from '@/pages';
import { Button } from '@mantine/core';
import { useEffect } from 'react';

export const App = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (!user) {
			return;
		}

		setUserOnline(user.uid, {
			status: 0,
			username: user.displayName || 'Anonymous',
			picture: user.photoURL || '',
		});

		window.addEventListener('beforeunload', async () => {
			await setUserOffline(user.uid);
		});
	}, [user]);

	return user ? (
		<Home />
	) : (
		<Button onClick={() => signInWithGoogle()}>Sign in with google</Button>
	);
};
