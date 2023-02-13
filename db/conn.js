
const mongoose = require('mongoose');
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:12345@cluster0.eoxjqnp.mongodb.net/cost_manager?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
module.exports = connectDb;
