import { Schema, model } from 'mongoose';
import { hash, genSalt, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please add a name']
	},
	email: {
		type: String,
		required: [true, 'Please add a email'],
		unique: [true, 'Email already in use.'],
		validate: [
			/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
			'Please add a valid email address'
		]
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: [6, 'Password must be at least 6 characters long.'],
		select: false
	},
	calories: {
		type: Number,
		min: 0,
		required: true
	},
	consumed: {
		type: Number
	},
	lastLog: {
		type: Date
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	},
	triesToAccess: {
		type: Number,
		default: 10,
		min: 0,
		select: false
	},
	recoveryToken: {
		type: String
	},
	recoveryTokenExpDate: {
		type: Date
	}
});

UserSchema.pre('save', async function(next) {
	if (this.isModified('password')) {
		const salt = await genSalt(10);
		const hashed = await hash(this.password, salt);
		this.password = hashed;
	}
	next();
});

UserSchema.methods.getAuthToken = function() {
	const config = {
		expiresIn: process.env.SESSION_EXPIRE
	};

	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, config);
};

UserSchema.methods.verifyPassword = async function(enteredPassword) {
	return await compare(enteredPassword, this.password);
};

export default model('User', UserSchema);
