import React from 'react';

function PaginationNav(props: { hasPrevPage: boolean, hasNextPage: boolean, page: number, totalPages: number, paginationContainer: string }) {
	const previousClasses = ['page-link', (props.hasPrevPage ? '' : 'disabled')].join(' ');
	const nextClasses = ['page-link', (props.hasNextPage ? '' : 'disabled')].join(' ');
	const previousLink = `?page${(props.page ?? 1) - 1}`;
	const nextLink = `?page${(props.page ?? 1) + 1}`;;

	const hxBaseAttributes = {
		"hx-trigger": "click",
		"hx-target": props.paginationContainer,
		"hx-select": props.paginationContainer,
		"hx-swap": "outerHTML",
	}

	return (
		<nav aria-label='Pagination Navigation'>
			<ul className="pagination">
				<li className="page-item">
					<a
						className={previousClasses}
						href={previousLink}
						hx-get={previousLink}
						{...hxBaseAttributes}
					>
						Previous
					</a>
				</li>
				{
					Array.from({ length: props.totalPages }).map((_, i) => (
						<li className='page-item' key={i}>

							<a
								className={`page-link ${props.page === i + 1 ? 'active' : ''}`}
								href={`?page=${i + 1}`}
								hx-get={`?page=${i + 1}`}
								{...hxBaseAttributes}
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
						hx-get={`?page=${(props.page ?? 1) + 1}`}
						{...hxBaseAttributes}
					>
						Next
					</a>
				</li>

			</ul>
		</nav>
	)
}

export default PaginationNav;