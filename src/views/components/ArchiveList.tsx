import express from 'express';
import React from 'react';
import { getServerSideProps as getArchiveData } from '../ArchivePage';
import ArchiveListItem from './ArchiveListItem';

export async function getServerSideProps(req: express.Request, res: express.Response) {
	return {
		...await (getArchiveData(req, res)),
	}
}
export type PostListProps = Awaited<ReturnType<typeof getServerSideProps>>;

function ArchiveList(props: PostListProps) {
	const previousLink = `/?page${(props.data.page ?? 1) - 1}`;
	const nextLink = `/?page${(props.data.page ?? 1) + 1}`;
	const previousClasses = ['page-link', (props.data.hasPrevPage ? '' : 'disabled')].join(' ');
	const nextClasses = ['page-link', (props.data.hasNextPage ? '' : 'disabled')].join(' ');
	const basePartialUrl = `/partials/archive-list/${props.collection}`;

	return (
		<div id="post-list">
			<nav aria-label='Post List Page Navigation'>
				<ul className="pagination">
					<li className="page-item">
						<a
							className={previousClasses}
							href={previousLink}
							hx-trigger="click"
							hx-target="#post-list"
							hx-swap="outerHTML"
							hx-get={`${basePartialUrl}?page=${(props.data.page ?? 1) - 1}`}
						>
							Previous
						</a>
					</li>
					{
						Array.from({ length: props.data.totalPages }).map((_, i) => (
							<li className='page-item' key={i}>

								<a
									className={`page-link ${props.data.page === i + 1 ? 'active' : ''}`}
									href={`?page=${i + 1}`}
									hx-trigger="click"
									hx-target="#post-list"
									hx-swap="outerHTML"
									hx-get={`${basePartialUrl}?page=${i + 1}`}
								>
									{i + 1}
								</a>
							</li>
						))
					}
					<li className="page-item">
						<a
							href={nextLink}
							className={nextClasses}
							hx-trigger="click"
							hx-target="#post-list"
							hx-swap="outerHTML"
							hx-get={`${basePartialUrl}?page=${(props.data.page ?? 1) + 1}`}
						>
							Next
						</a>
					</li>

				</ul>
			</nav>
			<div className="row gx-2 gy-5">
				{props.data.docs.map((post) => (
					<div key={post.id} className='col-4'>
						<ArchiveListItem id={post.id} title={post.title} publishedAt={post.publishedAt || post.createdAt} />
					</div>
				))}
			</div>
		</div>
	);
}
export default ArchiveList;