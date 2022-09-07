import { Paper, NavLink, Avatar } from '@mantine/core';

type Props = {
	avatar: string;
	username: string;
};

export const UserBlock = ({ avatar, username }: Props) => {
	return (
		<Paper>
			<NavLink
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
