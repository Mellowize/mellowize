import React from 'react';
import NavBar from '../components/NavBar';

type DefaultLayoutProps = {
	children: React.ReactNode;
	title?: string;
	head?: React.ReactNode[];
	body?: React.ReactNode[];
};

function DefaultLayout(props: DefaultLayoutProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{props.title ?? 'Document'}</title>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
			</head>
			<body style={{ 'overflowY': 'scroll' }}>
				<NavBar />
				<div className='mt-4'>
					{props.children}
				</div>
				<script src="https://unpkg.com/htmx.org@1.9.9"></script>
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
			</body>
		</html>
	)
}

export default DefaultLayout;