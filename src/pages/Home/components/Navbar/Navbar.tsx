import { Navbar as MantineNavbar, ScrollArea, List } from '@mantine/core';
import { UserBlock } from '@/сommon/components';

export const Navbar = () => {
	return (
		<MantineNavbar width={{ base: 300 }}>
			<MantineNavbar.Section
				grow
				component={ScrollArea}
				mx="-xs"
				px="xs"
			>
				<List listStyleType="none">
					<List.Item>
						<UserBlock
							avatar="test"
							username="Serhii Romanov"
						/>
					</List.Item>
				</List>
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};
