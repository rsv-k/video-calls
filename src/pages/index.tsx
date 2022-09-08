import { RouteObject } from 'react-router-dom';
import { Home } from './Home';

export const pages: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
		children: [
			{
				path: '/:id',
				element: <Home />,
			},
		],
	},
];
