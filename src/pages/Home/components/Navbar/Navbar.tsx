import { usersColRef } from '@/configs/firebase';
import { List, Navbar as MantineNavbar, ScrollArea } from '@mantine/core';
import { useCollection } from 'react-firebase-hooks/firestore';

import { TUser } from '@/types';
import { UserBlock } from '@/сommon/components';

export const Navbar = () => {
	const [snapshot] = useCollection(usersColRef);

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
							<UserBlock
								avatar={user.picture}
								username={user.username}
							/>
						</List.Item>
					))}
				</List>
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};
