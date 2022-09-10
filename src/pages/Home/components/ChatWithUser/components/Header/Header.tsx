import { useVideoCalls } from '@/pages/Home/contexts/video-calls-context';
import { Group, Text, ActionIcon } from '@mantine/core';
import { IconPhoneCall } from '@tabler/icons';

type Props = {
	height?: number;
	username: string;
	userId: string;
};

export const Header = ({ height, username, userId }: Props) => {
	const { onCall } = useVideoCalls();

	const callUser = () => {
		onCall(userId);
	};

	return (
		<Group
			sx={(theme) => ({ height, padding: theme.spacing.md })}
			position="apart"
		>
			<Text size="lg">{username}</Text>
			<ActionIcon onClick={callUser}>
				<IconPhoneCall size={24} />
			</ActionIcon>
		</Group>
	);
};
