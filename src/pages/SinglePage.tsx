import React from 'react';
import express from 'express';
import payload from 'payload';
import { page } from '../lib/page';

const SinglePage = page({
	async getServerSideProps(req) {
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
	},
	render(props) {
		return (
			<main>
				<h1>{props.data.title}</h1>
				<p>{JSON.stringify(props.data.content)}</p>
			</main>
		)
	}
})

export default SinglePage;