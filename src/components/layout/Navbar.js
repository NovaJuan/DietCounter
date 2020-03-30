import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../state/actions/auth';
import { clearData } from '../../state/actions/meals';

const Navbar = ({ user, logout, clearData }) => {
	const [links, setLinks] = useState(
		<Fragment>
			<NavLink className='nav-item nav-link' to='/login'>
				Login
			</NavLink>
			<NavLink className='nav-item nav-link' to='/register'>
				Register
			</NavLink>
		</Fragment>
	);

	const onLogout = () => {
		logout();
		clearData();
	};

	useEffect(() => {
		if (user !== null) {
			setLinks(
				<Fragment>
					<a href='#!' className='btn btn-danger btn-sm' onClick={onLogout}>
						Log Out
					</a>
				</Fragment>
			);
		} else {
			setLinks(
				<Fragment>
					<NavLink className='nav-item nav-link' to='/login'>
						Login
					</NavLink>
					<NavLink className='nav-item nav-link' to='/register'>
						Register
					</NavLink>
				</Fragment>
			);
		}
		// eslint-disable-next-line
	}, [user]);

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container'>
				<Link className='navbar-brand h1 mb-0' to='/'>
					Diet Counter
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNavAltMarkup'
					aria-controls='navbarNavAltMarkup'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
					<div className='navbar-nav ml-auto'>{links}</div>
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { logout, clearData })(Navbar);
