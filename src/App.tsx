import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { Button } from '@mantine/core';
import { useRoutes } from 'react-router-dom';

import { auth, setUserOffline, setUserOnline } from '@/configs/firebase';
import { pages } from '@/pages';

export const App = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [user] = useAuthState(auth);

	const routes = useRoutes(pages);

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
		routes
	) : (
		<Button onClick={() => signInWithGoogle()}>Sign in with google</Button>
	);
};
