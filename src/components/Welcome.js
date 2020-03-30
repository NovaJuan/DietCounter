import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Welcome = ({ user, history }) => {
	useEffect(() => {
		if (user !== null) {
			history.push('/');
		}
		// eslint-disable-next-line
	}, [user]);

	return (
		<div className='jumbotron'>
			<h1 className='display-4'>Hello!</h1>
			<p className='lead'>
				This is a calorie counter web app created by Juan Romero. Enjoy!
			</p>
			<hr className='my-4' />
			<p>Ready to start? Let's log in!</p>
			<Link className='btn btn-success mr-2' to='/login' role='button'>
				Login
			</Link>
			<Link className='btn btn-primary' to='/register' role='button'>
				Register
			</Link>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(Welcome);
