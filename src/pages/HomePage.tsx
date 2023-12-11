import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { page } from '../lib/page';

const HomePage = page({
	render: () => {
		return (
			<DefaultLayout>
				<main className='container'>
					<h1>Home Page</h1>
				</main>
			</DefaultLayout>
		);
	}
})

export default HomePage;
