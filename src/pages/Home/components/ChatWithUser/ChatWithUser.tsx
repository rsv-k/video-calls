import { Header } from './components';
import { Divider, Box, Button } from '@mantine/core';
import { useVideoCalls } from '../../contexts/video-calls-context';
import ReactPlayer from 'react-player';

type Props = {
	username: string;
	userId: string;
};

export const ChatWithUser = ({ userId, username }: Props) => {
	const { state, onAnswer, onRefuse, onLeaveCall } = useVideoCalls();

	const isActiveCall = state.usersOnCall.length > 1;

	return (
		<Box
			sx={(theme) => ({
				margin: -theme.spacing.md,
			})}
		>
			<Header
				userId={userId}
				height={60}
				username={username}
			/>
			<Divider />
			{state.incomingCall ? (
				<Box>
					<Button onClick={onAnswer}>Answer</Button>
					<Button
						onClick={onRefuse}
						color="red"
					>
						Refuse
					</Button>
				</Box>
			) : null}

			{isActiveCall ? (
				<Box>
					<Button onClick={onLeaveCall}>Leave call</Button>
					{state.usersOnCall.map(({ stream }, index) => (
						<ReactPlayer
							playsinline
							playing
							key={stream.id}
							muted={index === 0}
							url={stream}
						/>
					))}
				</Box>
			) : null}
		</Box>
	);
};
