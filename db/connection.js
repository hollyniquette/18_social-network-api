import mongoose from 'mongoose';

const { connect } = mongoose;
const connection = mongoose.connection;

connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to database', err);
  });

export default connection;
