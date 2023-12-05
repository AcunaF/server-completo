const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting to the database");
  }
};

module.exports = {
  dbConnection,
};
