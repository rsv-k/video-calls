import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useWindowEvent } from '@mantine/hooks';
import { useEffect } from 'react';
import { Button } from '@mantine/core';
import { useRoutes } from 'react-router-dom';

import { auth, setUserOffline, setUserOnline } from '@/configs/firebase';
import { pages } from '@/pages';

export const App = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [user] = useAuthState(auth);
	useWindowEvent('beforeunload', setUserOffline);

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
	}, [user]);

	return user ? (
		routes
	) : (
		<Button onClick={() => signInWithGoogle()}>Sign in with google</Button>
	);
};
