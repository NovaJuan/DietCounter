import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { register } from '../../state/actions/auth';

const Register = ({ error, register, history, user }) => {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		calories: ''
	});

	useEffect(() => {
		if (user !== null) {
			history.push('/');
		}
		// eslint-disable-next-line
	}, [user]);

	const onSubmit = async e => {
		e.preventDefault();
		register(data);
	};

	const onChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className='row'>
			<div className='col-md-4 offset-md-4'>
				<h1 className='text-center'>
					Register to <span className='text-primary'>Diet Counter</span>
				</h1>
				<div className='card card-body'>
					{error && <p className='text-danger text-center'>{error}</p>}
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<input
								type='text'
								name='name'
								placeholder='Name'
								className='form-control'
								value={data.name}
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='email'
								name='email'
								placeholder='Email'
								className='form-control'
								value={data.email}
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								name='password'
								placeholder='Password'
								className='form-control'
								value={data.password}
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								name='password2'
								placeholder='Confirm password'
								className='form-control'
								value={data.password2}
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='number'
								name='calories'
								placeholder='Your Calories'
								className='form-control'
								value={data.calories}
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<button className='btn btn-primary btn-block'>Register</button>
						</div>
					</form>
					<p>
						Have account? <Link to='/login'>Log in here</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	error: state.auth.error,
	user: state.auth.user
});

export default connect(mapStateToProps, { register })(Register);
