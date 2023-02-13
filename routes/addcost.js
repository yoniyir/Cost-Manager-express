// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112


const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');
const User = require('../models/user');
const Report = require('../models/reportmodel');

// Route to add a new cost
router.post('/', (req, res, next) => {
  // Extract data from the request body
  let user_id = req.body.user_id;
  // check if there is a user with the same id
  User.findOne({ id: user_id }).then((user) => {
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }
    else {
      let year = req.body.year ? req.body.year : new Date().getFullYear().toString();
      let month = req.body.month ? req.body.month : (new Date().getMonth() + 1).toString();
      let day = req.body.day ? req.body.day : (new Date().getDate()).toString();
      let description = req.body.description;
      let category = req.body.category;
      let sum = parseFloat(req.body.sum);

      // Check if all required parameters are present
      if (!user_id || !year || !month || !day || !description || !category || !sum) {
        return res.status(400).send({ error: 'Missing required parameters' });
      }
      // Validate the year
      if (year < 2000 || year > new Date().getFullYear()) {
        // If the provided year is invalid, return a 400 Bad Request response with an error message
        res.status(400).send(`Invalid year: ${req.query.year} (must be between 2000 and ${new Date().getFullYear()})`);
        return;
      };
      // Validate the date
      if (month < 0 || month > 12 || day < 0 || day > 31) {
        return res.status(400).send({ error: 'Invalid date' });
      }

      // Validate the category
      if (!["food", "health", "housing", "sport", "education", "transportation", "other"].includes(category)) {
        return res.status(400).send({ error: 'Invalid category' });
      }

      // Validate the sum
      if (sum < 0) {
        return res.status(400).send({ error: 'Invalid sum' });
      }

      // Get the count of existing costs and set the id for the new cost
      Cost.countDocuments().then((count) => {
        let newCost = new Cost({
          user_id: user_id,
          year: year,
          month: month,
          day: day,
          id: count + 1,
          description: description,
          category: category,
          sum: sum
        });

        // Save the new cost to the database
        newCost.save().then(() => {
          Report.findOne({ user_id: user_id, year: year, month: month }).then((report) => {
            if (!report) {
              // Create a new report if one does not exist
              let newReport = new Report({
                user_id: user_id,
                year: year,
                month: month,
                report: {
                  food: [],
                  health: [],
                  housing: [],
                  sport: [],
                  education: [],
                  transportation: [],
                  other: []
                }
              });
              newReport.report[category].push({
                id: count + 1,
                description: description,
                sum: sum
              });

              newReport.save().then(() => {
                console.log('Report created successfully');
                res.send({ message: 'Cost added successfully' });
              }).catch(next);

            }
            else {
              // Update the existing report
              report.report[category].push({
                id: count + 1,
                description: description,
                sum: sum
              });

              report.save().then(() => {
                console.log('Report updated successfully');
                res.send({ message: 'Cost added successfully' });
              }).catch(next);
            }
          })
        }).catch(next);
      });
    };
  });

});

module.exports = router;
