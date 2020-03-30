import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';
import setAuthToken from './utils/setAuthToken';

if (localStorage['dietcounter-token']) {
	setAuthToken(localStorage['dietcounter-token']);
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
