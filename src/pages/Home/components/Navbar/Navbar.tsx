import { useParams } from 'react-router-dom';
import { StyledNavLink } from './Elements';
import { auth, usersColRef } from '@/configs/firebase';
import { List, Navbar as MantineNavbar, ScrollArea } from '@mantine/core';
import { query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { TParamsWithId, TUser } from '@/types';
import { UserBlock } from '@/сommon/components';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Navbar = () => {
	const { id } = useParams<TParamsWithId>();
	const [user] = useAuthState(auth);
	const [snapshot] = useCollection(
		query(usersColRef, where('__name__', '!=', user && user.uid)),
	);

	const users = snapshot?.docs.map((doc) => ({
		userId: doc.id,
		...doc.data(),
	})) as TUser[];

	return (
		<MantineNavbar width={{ base: 300 }}>
			<MantineNavbar.Section
				grow
				component={ScrollArea}
				mx="-xs"
				px="xs"
			>
				<List listStyleType="none">
					{users?.map((user) => (
						<List.Item key={user.userId}>
							<StyledNavLink
								to={`${user.userId}`}
								state={user}
							>
								<UserBlock
									active={user.userId === id}
									avatar={user.picture}
									username={user.username}
								/>
							</StyledNavLink>
						</List.Item>
					))}
				</List>
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};
