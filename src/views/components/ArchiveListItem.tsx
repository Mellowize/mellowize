import React from 'react';

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

export default ArchiveListItem;