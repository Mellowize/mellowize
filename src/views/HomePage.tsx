import React from 'react';
import DefaultLayout from './layouts/DefaultLayout';

function Home(props: {}) {
	return (
		<DefaultLayout>
			<main className='container'>
				<h1>Home Page</h1>
			</main>
		</DefaultLayout>
	);
}

export default Home;