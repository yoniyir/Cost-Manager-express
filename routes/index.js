// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json([
    {
      "method": "GET",
      "endpoint": "/about",
      "description": "Returns the names of the program developers, in JSON format",
      "requiredParams": []
    },
    {
      "method": "GET",
      "endpoint": "/init",
      "description": "Initializes the DB with one user and one cost",
      "requiredParams": []
    },
    {
      "method": "GET",
      "endpoint": "/categories",
      "description": "Returns all available categories, in JSON format",
      "requiredParams": []
    },
    {
      "method": "GET",
      "endpoint": "/report",
      "description": "Returns the total cost of a specific month, in JSON format",
      "requiredParams": [
        "user_id",
        "year",
        "month"
      ]
    },
    {
      "method": "POST",
      "endpoint": "/addcost",
      "description": "Adds a new cost to the DB",
      "requiredParams": [
        "user_id",
        "year",
        "month",
        "day",
        "description",
        "category",
        "sum"
      ]
    }
  ]
  );
});

module.exports = router;
