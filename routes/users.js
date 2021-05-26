var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(process.env.MONGODB_URI);
});

module.exports = router;
