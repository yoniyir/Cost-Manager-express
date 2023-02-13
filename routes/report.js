// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112


var express = require('express');
var router = express.Router();
var Cost = require('../models/cost');
var Report = require('../models/reportmodel');

function getReport(req, res) {
  // Check if the required parameters (user_id, year, month) are present in the request query
  let user_id = req.query.user_id;
  let year = req.query.year;
  let month = req.query.month;
  if (!user_id || !year || !month) {
    // If any of the required parameters are missing, return a 400 Bad Request response with an error message
    res.status(400).send(`Missing Parameters: ${user_id ? '' : 'user_id, '}${year ? '' : 'year, '}${month ? '' : 'month'}`);
    return;
  };
  // Check if the provided year is valid and until our year
  if (req.query.year < 1999 || req.query.year > new Date().getFullYear()) {
    // If the provided year is invalid, return a 400 Bad Request response with an error message
    res.status(400).send(`Invalid year: ${req.query.year} (must be between 2000 and ${new Date().getFullYear()})`);
    return;
  };
  // Check if the provided month, and day values are valid
  if (req.query.month < 0 || req.query.month > 12 || req.query.day < 0 || req.query.day > 31) {
    // If any of the provided date values are invalid, return a 400 Bad Request response with an error message
    res.status(400).send('Invalid date');
    return;
  };

  // Check if a report for the provided user_id, year, and month already exists in the database
  // Computed pattern
  Report.findOne({ user_id: user_id, year: year, month: month }, (error, report) => {
    if (error) {
      // If there was an error getting the report from the database, log the error and return an error response
      console.log('Error getting report from MongoDB:', error);
      res.status(500).send('Error getting report from MongoDB');
    } else if (report) {
      // If a report for the provided user_id, year, and month was found in the database, log a success message and return the report
      console.log('Successfully got report from MongoDB');
      res.status(200).send(report.report);
    } else {
      // If a report for the provided user_id, year, and month was not found in the database, get the costs for the provided user_id, year, and month from the database
      res.status(200).send('No report found for the provided user_id, year, and month');
    }
  });
}

// Call the getReport function to handle the request
router.get('/', function (req, res, next) {
  getReport(req, res);
});

module.exports = router;