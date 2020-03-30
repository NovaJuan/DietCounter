import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser, clearError } from './state/actions/auth';

import Navbar from './components/layout/Navbar';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = ({ loadUser, clearError, loading }) => {
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<Router>
			<Fragment>
				<Navbar />
				<div className='container mt-4'>
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route exact path='/welcome' component={Welcome} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
};

const mapStateToProps = state => ({
	loading: state.auth.loading,
	user: state.auth.user
});

export default connect(mapStateToProps, { loadUser, clearError })(App);
