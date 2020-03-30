import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Macros from './Macros';
import Meals from './Meals';

const Home = ({ user, history }) => {
	useEffect(() => {
		if (user === null) {
			history.push('/welcome');
		}
		// eslint-disable-next-line
	}, [user]);
	return (
		<div className='row'>
			<div className='col-md-6'>
				<Macros />
			</div>
			<div className='col-md-6'>
				<Meals />
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(Home);
