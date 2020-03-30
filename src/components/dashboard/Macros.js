import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';

import { getConsumed } from '../../state/actions/meals';

const Macros = ({ user, loading, consumed, getConsumed }) => {
	useEffect(() => {
		getConsumed();
		// eslint-disable-next-line
	}, [user]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className='card card-body'>
			<h4 className='text-center'>Your calories</h4>
			<div className='row mt-3'>
				<div className='col-md-6 text-right border-right'>
					<p className='mb-0'>Your total calories</p>
					<h1 className='my-0 display-4'>
						<strong className='text-primary '>{user.calories}</strong>
					</h1>
				</div>
				<div className='col-md-6 text-left'>
					<p className='mb-0'>Available</p>
					<h1 className='my-0 display-4'>
						{!loading && consumed ? (
							user.calories - consumed.calories < 0 ? (
								<strong className='text-danger'>
									{user.calories - consumed.calories}
								</strong>
							) : (
								<strong className='text-success'>
									{user.calories - consumed.calories}
								</strong>
							)
						) : (
							<strong className='text-success'>{user.calories}</strong>
						)}
					</h1>
				</div>
			</div>
			<p className='text-center mb-0 mt-3' style={{ fontSize: '20px' }}>
				<span className='badge badge-success badge-pill'>
					P : {!loading && consumed ? consumed.proteins : 0}
				</span>
				<span className='badge badge-danger badge-pill mx-4'>
					C : {!loading && consumed ? consumed.carbs : 0}
				</span>
				<span className='badge badge-warning badge-pill'>
					F : {!loading && consumed ? consumed.fats : 0}
				</span>
			</p>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	loading: state.auth.loading,
	consumed: state.meals.consumed
});

export default connect(mapStateToProps, { getConsumed })(Macros);
