import payload from "payload";
import { ZodError, z } from "zod";
import { HttpError } from "../util/http-error";
import express from 'express';
import DefaultLayout from "./layouts/DefaultLayout";
import React from "react";
import ArchiveList from "./components/ArchiveList";
import { PaginatedDocs } from "payload/database";
import { BasePostType } from "../util/base-post-type";

export async function getServerSideProps(req: express.Request, res: express.Response) {
	try {
		const collectionSlug = req.params['collection'];

		// TODO: validate collectionSlug against payload collections

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
}
type ArchiveProps = Awaited<ReturnType<typeof getServerSideProps>>;

function Archive(props: ArchiveProps) {
	return (
		<DefaultLayout>
			<main className="container">
				<h1>Posts</h1>
				<ArchiveList
					collection={props.collection}
					data={props.data}
				/>
			</main>
		</DefaultLayout>
	)
}

export default Archive;