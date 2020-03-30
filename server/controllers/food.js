import asyncCatcher from '../middlewares/asyncCatcher';
import Food from '../models/Food';
import customResults from '../utils/customResults';
import ErrorResponse from '../utils/ErrorResponse';

//@desc     Get all foods
//@route    GET /api/v1/food
//@access   Private
exports.getFoods = asyncCatcher(customResults(Food));

//@desc     Create food
//@route    POST /api/v1/food
//@access   Private
exports.createFood = asyncCatcher(async (req, res, next) => {
	const newFood = await Food.create({ ...req.body, user: req.user._id });

	res.status(201).json({
		success: true,
		data: newFood
	});
});

//@desc     Update food
//@route    PUT /api/v1/food/:id
//@access   Private
exports.updateFood = asyncCatcher(async (req, res, next) => {
	let food = await Food.findById(req.params.id);

	if (!food) {
		return next(
			new ErrorResponse(`No food found with id ${req.params.id}`, 404)
		);
	}

	food.set({ ...req.body });

	food = await food.save({ validateBeforeSave: true });

	res.status(200).json({
		success: true,
		data: food
	});
});

//@desc     Delete food
//@route    DELETE /api/v1/food/:id
//@access   Private
exports.deleteFood = asyncCatcher(async (req, res, next) => {
	let food = await Food.findById(req.params.id).select('+user');

	if (!food) {
		return next(
			new ErrorResponse(`No food found with id ${req.params.id}`, 404)
		);
	}

	if (food.user.toString() !== req.user._id.toString()) {
		return next(
			new ErrorResponse('Sorry, you are not allowed to delete this food.')
		);
	}

	await food.remove();

	res.status(200).json({
		success: true,
		data: {},
		msg: 'Food removed.'
	});
});
