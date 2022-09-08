import { TUser } from '@/types';
import { Header } from './components';

type Props = {
	user: TUser;
};

export const ChatWithUser = ({ user }: Props) => {
	return (
		<Header
			userId={user.userId}
			height={60}
			username={user.username}
		/>
	);
};
