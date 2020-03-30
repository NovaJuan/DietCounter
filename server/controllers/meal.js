import asyncCatcher from '../middlewares/asyncCatcher';
import User from '../models/User';
import Food from '../models/Food';
import Meal from '../models/Meal';
import ErrorResponse from '../utils/ErrorResponse';
import customResults from '../utils/customResults';

//@desc     Get all meals
//@route    GET /api/v1/meal
//@access   Private/admin
exports.getAllMeals = asyncCatcher(customResults(Meal, 'food'));

//@desc     Get user meals
//@route    GET /api/v1/meal/user
//@access   Private
exports.getUserMeals = asyncCatcher(async (req, res, next) => {
	const now = new Date();
	const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	let meals = await Meal.find({
		user: req.user._id,
		createdAt: { $gte: startDate }
	}).populate('food');

	res.status(200).json({
		success: true,
		data: meals
	});

	await User.findByIdAndUpdate(req.user._id, { lastLog: now });
});

//@desc     Get user consumed macros
//@route    GET /api/v1/meal/consumed
//@access   Private
exports.getConsumedMeals = asyncCatcher(async (req, res, next) => {
	const consumed = await Meal.getConsumed(req.user._id);

	res.status(200).json({
		success: true,
		data: consumed[0] || null
	});
});

//@desc     Create Meal
//@route    POST /api/v1/meal/:foodid
//@access   Private
exports.addMeal = asyncCatcher(async (req, res, next) => {
	const food = await Food.findById(req.params.foodid);

	if (!food) {
		return new ErrorResponse(`No food with id ${req.params.foodid}`, 404);
	}

	const { type, servingQty } = req.body;
	if (!type || !servingQty) {
		return new ErrorResponse(
			`Please set a meal type and serving quantity (servingQty).`,
			400
		);
	}

	const calories = parseInt(food.calories * servingQty);
	const proteins = parseInt(food.proteins * servingQty);
	const fats = parseInt(food.fats * servingQty);
	const carbs = parseInt(food.carbs * servingQty);

	let newMeal = {
		food: food._id,
		user: req.user._id,
		type,
		servingQty,
		calories,
		proteins,
		fats,
		carbs
	};

	newMeal = await Meal.create(newMeal);

	newMeal.food = food;

	res.status(201).json({
		success: true,
		data: newMeal
	});
});

//@desc     Delete a meal
//@route    DELETE /api/v1/meal/:id
//@access   Public
exports.deleteMeal = asyncCatcher(async (req, res, next) => {
	const meal = await Meal.findById(req.params.id);

	if (!meal) {
		return new ErrorResponse(`No meal with id ${req.params.id}`, 404);
	}

	await meal.remove();

	res.status(200).json({
		success: true,
		data: {}
	});
});

//@desc     Update a meal
//@route    PUT /api/v1/meal/:id
//@access   Private
exports.updateMeal = asyncCatcher(async (req, res, next) => {
	let meal = await Meal.findById(req.params.id);

	if (!meal) {
		return next(new ErrorResponse(`No meal with id ${req.params.id}`, 404));
	}

	const food = await Food.findById(meal.food.toString());

	if (!food) {
		return next(new ErrorResponse(`Sorry your food was deleted`, 403));
	}

	if (req.body.servingQty) {
		req.body.calories = parseInt(food.calories * req.body.servingQty);
		req.body.proteins = parseInt(food.proteins * req.body.servingQty);
		req.body.fats = parseInt(food.fats * req.body.servingQty);
		req.body.carbs = parseInt(food.carbs * req.body.servingQty);
	}

	meal = meal.set({ ...req.body });

	meal = await meal.save({
		validateBeforeSave: true
	});

	meal.food = food;

	res.status(200).json({
		success: true,
		data: meal
	});
});
