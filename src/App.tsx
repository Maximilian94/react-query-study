import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from 'react-query';

function fetchUser(username: string) {
	return fetch(`https://api.github.com/users/${username}`).then((res) =>
		res.json()
	);
}

function GithubUser({ username }: { username: string }) {
	const userQuery = useQuery([username], () => fetchUser(username));
	const data = userQuery.data;

	if (userQuery.isLoading) return <p>Loading...</p>;

	if (userQuery.error) return <p>Error</p>;

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function App() {
	return (
		<div className='App'>
			<GithubUser username='Maximilian94' />
		</div>
	);
}

export default App;
