import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
	const db = await mongoose.connect(
		process.env.MONGO_URI || 'mongodb://mongo:27017/dietcounter',
		{
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	);
	console.log(`Database connected at host ${db.connection.host}`.cyan.inverse);
};

export default connectDB;
