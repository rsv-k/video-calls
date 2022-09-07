import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, Global } from '@mantine/core';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider>
			<Global
				styles={() => ({
					body: {
						margin: 0,
					},
				})}
			/>
			<App />
		</MantineProvider>
	</React.StrictMode>,
);
