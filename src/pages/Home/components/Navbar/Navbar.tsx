import { List, Navbar as MantineNavbar, ScrollArea } from '@mantine/core';
import { StyledNavLink } from './Elements';

import { TUser } from '@/types';
import { UserBlock } from '@/сommon/components';

type Props = {
	users: TUser[];
	selectedUserId?: string;
};

export const Navbar = ({ users, selectedUserId }: Props) => {
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
									active={user.userId === selectedUserId}
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
