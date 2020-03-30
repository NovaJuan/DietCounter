import ErrorResponse from '../utils/ErrorResponse';

export default (err, req, res, next) => {
	let error = {
		...err
	};

	error.message = err.message;

	console.error(err);

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		let message = Object.values(err.errors);
		message = message.map(error => error.message).join(', ');
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'CastError') {
		let message = `No resource found with id ${err.value}`;
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error'
	});
};
