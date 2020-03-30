import { Schema, model } from 'mongoose';

const FoodSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please add a food name']
	},
	servingName: {
		type: String,
		required: [true, 'Please serving serving name.']
	},
	servingSize: {
		type: Number,
		required: [true, 'Please add serving size']
	},
	calories: {
		type: Number,
		min: 0,
		required: [true, 'Please add calories per serving']
	},
	proteins: {
		type: Number,
		min: 0,
		required: [true, 'Please add proteins per serving']
	},
	carbs: {
		type: Number,
		min: 0,
		required: [true, 'Please add carbs per serving']
	},
	fats: {
		type: Number,
		min: 0,
		required: [true, 'Please add fats per serving']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		select: false
	}
});

FoodSchema.index({ name: 'text' });

export default model('Food', FoodSchema);
