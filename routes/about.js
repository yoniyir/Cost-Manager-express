// The developers of the project:
// Yoni Yirmiyahu - 204797682
// Rotem Mor-Haim - 211905112


var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const US = [{
        first_name: "Yoni",
        last_name: "Yirmiyahu",
        id: "204797682",
        email: "myoni1997@gmail.com"
    },
    {
        first_name: "Rotem",
        last_name: "Mor-Haim",
        ID: "211905112",
        email: "rotemmorhaim17@gmail.com"
    }];
    res.json(US);
});

module.exports = router;
