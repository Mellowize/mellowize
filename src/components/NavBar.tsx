import React from 'react';

export type NavBarProps = {
	user?: Record<string, unknown>;
}

function NavBar(props: NavBarProps) {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container">
				<a className="navbar-brand" href="#">Navbar</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="/"
								hx-get="/"
								hx-trigger="click"
								hx-target="#main-content"
								hx-select="#main-content"
								hx-swap="outerHTML swap:0.15s"
								hx-push-url="true"
							>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="/posts"
								hx-get="/posts"
								hx-trigger="click"
								hx-target="#main-content"
								hx-select="#main-content"
								hx-swap="outerHTML swap:0.15s"
								hx-push-url="true"
							>
								Blog
							</a>
						</li>
						<li className='nav-item'>
							{props.user ? (<a className="nav-link" href="/admin">
								Admin
							</a>) : (<a className="nav-link" href="/admin">
								Login
							</a>)}
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	)
}

export default NavBar;
