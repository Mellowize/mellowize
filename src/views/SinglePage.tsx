import React from 'react';
import express from 'express';
import payload from 'payload';

export async function getServerSideProps(req: express.Request, res: express.Response) {
	const collectionSlug = req.params['collection'];
	const postId = req.params['post'];

	const post = await payload.findByID({
		collection: collectionSlug as any, // TODO:, fix this later
		id: postId,
	});

	return {
		collection: collectionSlug,
		data: post,
	}
}
export type SinglePageProps = Awaited<ReturnType<typeof getServerSideProps>>;

function SinglePage(props: SinglePageProps) {
	return (
		<main>
			<h1>{props.data.title}</h1>
			<p>{JSON.stringify(props.data.content)}</p>
		</main>
	)
}

export default SinglePage;