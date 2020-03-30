import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../state/actions/auth';

const Login = ({ error, login, history, user }) => {
	const [data, setData] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		if (user !== null) {
			history.push('/');
		}
		// eslint-disable-next-line
	}, [user]);

	const onSubmit = async e => {
		e.preventDefault();
		login(data);
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
					Login to <span className='text-primary'>Diet Counter</span>
				</h1>
				<div className='card card-body'>
					{error && <p className='text-danger text-center'>{error}</p>}
					<form onSubmit={onSubmit}>
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
							<button className='btn btn-primary btn-block'>Login</button>
						</div>
					</form>
					<p>
						No account? <Link to='/register'>Register here.</Link>
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

export default connect(mapStateToProps, { login })(Login);
