import payload from "payload";
import { ZodError, z } from "zod";
import { HttpError } from "../lib/http-error";
import express from 'express';
import DefaultLayout from "../layouts/DefaultLayout";
import React from "react";
import { PaginatedDocs } from "payload/database";
import { BasePostType } from "../lib/base-post-type";
import PaginationNav from "../components/PaginationNav";
import { page } from "../lib/page";

const ArchivePage = page({
	async getServerSideProps(req) {
		try {
			const collectionSlug = req.params['collection'];

			const query = z.object({
				page: z.string()
					.regex(/^\d+$/)
					.default('1')
					.transform(Number)
			}).parse(req.query);

			// TODO: come up with a way to make sure that the collectionSlug is pointing towards a collection that implements the base post type to ensure type safety
			const data: PaginatedDocs<BasePostType> = await payload.find({
				collection: collectionSlug as any,
				limit: 9,
				page: query.page,
			});

			return {
				collection: collectionSlug,
				data: data
			};
		} catch (e) {
			console.log(e);
			if (e instanceof ZodError) {
				throw new HttpError(400, 'Bad Request');
			}

			throw new HttpError(500, 'Internal Server Error');
		}
	},
	render(props) {
		return (
			<DefaultLayout>
				<main className="container">
					<h1>Posts</h1>
					<div id="archive-list">
						<PaginationNav
							hasPrevPage={props.data.hasPrevPage}
							hasNextPage={props.data.hasNextPage}
							page={props.data.page ?? 1}
							totalPages={props.data.totalPages}
							paginationContainer='#archive-list'
						/>
						<div className="row gx-2 gy-5">
							{props.data.docs.map((post) => (
								<div key={post.id} className='col-4'>
									<ArchiveListItem id={post.id} title={post.title} publishedAt={post.publishedAt || post.createdAt} />
								</div>
							))}
						</div>
					</div>
				</main>
			</DefaultLayout>
		)
	}
})

function ArchiveListItem(post: { id: string, title: string, publishedAt: string }) {
	return (
		<div className="card">
			<img src="https://via.placeholder.com/1280x720" className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">{post.title}</h5>
				<p>Published on {new Date(post.publishedAt).toDateString()}</p>
				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				<a href={`/posts/${post.id}`} className="btn btn-primary">Read more</a>
			</div>
		</div>
	)
}


export default ArchivePage;