import ReactDOM from 'react-dom/client';
import { Global, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<MantineProvider>
		<Global
			styles={() => ({
				body: {
					margin: 0,
				},
			})}
		/>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MantineProvider>,
);
