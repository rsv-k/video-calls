import { useEffect, useState } from 'react';

const App = () => {
	const [count, setCount] = useState([]);

	useEffect(() => {
		setCount([]);
	}, [count]);

	return <div>App</div>;
};

export default App;
