var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

async function get() {
    const client = new MongoClient(uri,{ useUnifiedTopology: true });
    try {
        await client.connect();
        const cursor = client.db('quest-i').collection('users').find();
        const results = await cursor.toArray();
        return results
    } finally {
        console.log('here');
        await client.close();
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    get().then(users => {
        res.render('users', { users: users });
    });
});

module.exports = router;
