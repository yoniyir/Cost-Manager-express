// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112


const express = require('express');
const router = express.Router();
var Cost = require('../models/cost');
var User = require('../models/user');
var Report = require('../models/reportmodel');

// Function to initialize the database
async function init(res, req) {
  try {
    // Delete all existing users and costs in the collections
    await User.deleteMany({});
    await Cost.deleteMany({});
    await Report.deleteMany({});

    // Create a new user
    const user = new User({
      id: "123123",
      first_name: "Moshe",
      last_name: "Israeli",
      birthday: "January, 10th, 1990"
    });

    // Save the user to the database
    await user.save();
    console.log('Users collection initialized successfully with one user');

    // Send a message to indicate that the database was initialized successfully
    res.send({ message: 'Initiallized DB successfully, check the console for more details' });
  } catch (error) {
    // Log the error message if there was an error initializing the database
    console.log('Error initializing the database:', error);
  }
}

// Route for initializing the database
router.get('/', async function (req, res, next) {
  // Call the init function to initialize the database
  await init(res, req);
});

// Export the router for use in other parts of the application
module.exports = router;