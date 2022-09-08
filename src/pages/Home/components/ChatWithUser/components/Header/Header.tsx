import { Group, Text, ActionIcon } from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons';

type Props = {
	height?: number;
	username: string;
	userId: string;
};

export const Header = ({ height, username, userId }: Props) => {
	const callUser = () => {
		console.log(userId);
	};

	return (
		<Group
			sx={{ height }}
			position="apart"
		>
			<Text size="lg">{username}</Text>
			<ActionIcon onClick={callUser}>
				<IconPhoneCall size={24} />
			</ActionIcon>
		</Group>
	);
};
