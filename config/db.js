const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.err(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
