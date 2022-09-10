import { AppShell } from '@mantine/core';
import { ChatWithUser, Navbar } from './components';
import { TParamsWithId, TUser } from '@/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { query, where } from 'firebase/firestore';
import { auth, usersColRef } from '@/configs/firebase';
import { useParams } from 'react-router-dom';
import { VideoCallsProvider } from './contexts/video-calls-context';

export const Home = () => {
	const { id } = useParams<TParamsWithId>();

	const [user] = useAuthState(auth);
	const [snapshot] = useCollection(
		query(
			usersColRef,
			where('__name__', '!=', user && user.uid),
			where('status', '==', 0),
		),
	);

	const users = snapshot?.docs.map((doc) => ({
		userId: doc.id,
		...doc.data(),
	})) as TUser[];

	return (
		<AppShell
			navbar={
				<Navbar
					users={users}
					selectedUserId={id}
				/>
			}
		>
			{id && user ? (
				<VideoCallsProvider
					users={users}
					currentUserId={user.uid}
				>
					<ChatWithUser
						userId={id}
						username={user.displayName || 'Anonymous'}
					/>
				</VideoCallsProvider>
			) : null}
		</AppShell>
	);
};
