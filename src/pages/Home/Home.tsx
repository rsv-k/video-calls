import { AppShell } from '@mantine/core';
import { ChatWithUser, Navbar } from './components';
import { useLocation } from 'react-router-dom';
import { TUser } from '@/types';

export const Home = () => {
	const location = useLocation();
	const user = location.state as TUser | null;

	return (
		<AppShell navbar={<Navbar />}>
			{user ? <ChatWithUser user={user} /> : null}
		</AppShell>
	);
};
