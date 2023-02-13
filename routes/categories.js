// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112


var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // Declare the categories object
    const categories = { categories: ["food", "health", "housing", "sport", "education", "transportation", "other"] };

    return new Promise((resolve, reject) => {
        resolve(categories);
    }).then((result) => {
        console.log(result, " Categories using Promise");
        res.json(result);
    }).catch((error) => {
        console.error(error);
        res.status(400).send(error);
    });
});

module.exports = router;
