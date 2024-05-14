import { connect } from 'mongoose';

const connectToDB = async () => {
	if (!process.env.MONGO_URI) throw new Error('Database URI not defined');

	await connect(process.env.MONGO_URI);

	console.log('Logged to Database');
};

export default connectToDB;
