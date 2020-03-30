import mongoose, { Schema, model } from 'mongoose';

const MealSchema = new Schema({
	servingQty: {
		type: Number
	},
	calories: {
		type: Number
	},
	proteins: {
		type: Number
	},
	carbs: {
		type: Number
	},
	fats: {
		type: Number
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	food: {
		type: Schema.Types.ObjectId,
		ref: 'Food'
	},
	type: {
		type: String,
		enum: ['Dinner', 'Launch', 'Breakfast', 'Other']
	}
});

MealSchema.statics.getConsumed = async function(user_id) {
	const now = new Date();
	const startFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	const consumed = await Meal.aggregate([
		{ $match: { user: user_id, createdAt: { $gte: startFrom } } },
		{
			$group: {
				_id: '$user',
				calories: { $sum: '$calories' },
				proteins: { $sum: '$proteins' },
				carbs: { $sum: '$carbs' },
				fats: { $sum: '$fats' }
			}
		}
	]);

	// 	const consumed = await Meal.aggregate([
	// 		{
	// 			$group: {
	// 				user: this.user,
	// 				total: { $sum: '$calories' }
	// 			}
	// 		}
	// 	]);

	return consumed;
};

const Meal = model('Meal', MealSchema);

export default Meal;
