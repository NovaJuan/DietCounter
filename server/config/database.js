import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
	try {
		const db = await mongoose.connect(`${process.env.MONGO_URI}`, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(
			`Database connected at host ${db.connection.host}`.cyan.inverse
		);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export default connectDB;
