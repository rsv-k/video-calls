import { Paper, NavLink, Avatar } from '@mantine/core';

type Props = {
	avatar: string;
	username: string;
	active?: boolean;
};

export const UserBlock = ({ avatar, username, active }: Props) => {
	return (
		<Paper>
			<NavLink
				active={active}
				p="md"
				icon={
					<Avatar
						radius="xl"
						color="indigo"
						src={avatar}
					>
						SR
					</Avatar>
				}
				label={username}
			/>
		</Paper>
	);
};
