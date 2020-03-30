import asyncCatcher from '../middlewares/asyncCatcher';
import User from '../models/User';
import ErrorResponse from '../utils/ErrorResponse';
import Meal from '../models/Meal';

//@desc     Get user info
//@route    GET /api/v1/auth
//@access   Private
exports.getInfo = asyncCatcher(async (req, res, next) => {
	res.status(200).json({
		success: true,
		data: req.user
	});
});

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.registerUser = asyncCatcher(async (req, res, next) => {
	let { name, email, calories, password, password2 } = req.body;

	if (!name || !email || !calories || !password || !password2) {
		return next(new ErrorResponse(`Please fill all fields.`, 400));
	}

	if (password !== password2) {
		return next(new ErrorResponse(`Passwords do not match.`, 400));
	}

	req.body.email = email.toLowerCase();

	let user = await User.findOne({ email });

	if (user) {
		return next(new ErrorResponse(`Email is already in use.`, 400));
	}

	// Delete not allowed user inputs
	const exclude = ['role', 'lastLog', 'consumed', 'createdAt', 'triesToAccess'];
	exclude.forEach(field => delete req.body[field]);

	user = await User.create(req.body);

	sendTokenResponse(user, res, 201);
});

//@desc     Log in user
//@route    POST /api/v1/auth/login
//@access   Public
exports.loginUser = asyncCatcher(async (req, res, next) => {
	let { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorResponse(`Please fill all fields.`, 400));
	}

	email = email.toLowerCase();

	let user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse(`Invalid credentials.`, 400));
	}

	if (!(await user.verifyPassword(password))) {
		return next(new ErrorResponse(`Invalid credentials.`, 400));
	}

	sendTokenResponse(user, res, 200);
});

//@desc     Update user details
//@route    PUT /api/v1/auth
//@access   Private
exports.updateDetails = asyncCatcher(async (req, res, next) => {
	// Delete not allowed user inputs
	const exclude = ['role', 'lastLog', 'consumed', 'createdAt', 'triesToAccess'];
	exclude.forEach(field => delete req.body[field]);

	let user = await User.findById(req.user._id);

	if (!user) {
		return next(new ErrorResponse('User does not exists.', 400));
	}

	user = user.set({ ...req.body });

	await user.save({ validateBeforeSave: true });

	user.password = undefined;

	res.status(200).json({
		success: true,
		data: user
	});
});

//@desc     Log out user
//@route    GET /api/v1/auth/logout
//@access   Private
exports.logoutUser = asyncCatcher(async (req, res, next) => {});

// Send token response
const sendTokenResponse = (user, res, statusCode) => {
	const token = user.getAuthToken();

	res.status(statusCode).json({
		success: true,
		token
	});
};
