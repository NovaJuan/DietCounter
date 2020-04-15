import '@babel/polyfill';

import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import connectDB from './config/database';

// Setting enviroment variables
dotenv.config({
	path: path.join(__dirname, 'config/config.env'),
});

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Starting server
const server = app.listen(
	PORT,
	console.log(
		`Server running on mode ${process.env.NODE_ENV} in port ${PORT}`.green
			.inverse
	)
);

//handle unhandled promise ejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);

	//Close server and exit
	server.close(() => process.exit(1));
});
