import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import jwt from 'jsonwebtoken';
import asyncCatcher from '../middlewares/asyncCatcher';

export const protect = asyncCatcher(async (req, res, next) => {
	let token = req.headers['authorization'];

	if (!token || !token.includes('Bearer')) {
		return next(new ErrorResponse('Not authorize to access this route.', 401));
	}

	token = token.split(' ')[1];

	let decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return next(new ErrorResponse(`Invalid authorization token.`, 403));
	}

	req.user = await User.findById(decoded.id);

	if (!req.user) {
		return next(new ErrorResponse(`Invalid authorization token.`, 403));
	}

	next();
});

export const authorized = function () {
	const args = [...arguments];

	return (req, res, next) => {
		if (args.includes(req.user.role)) {
			return next();
		}
		next(new ErrorResponse('Not authorized to access this route', 403));
	};
};
