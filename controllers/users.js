const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const results = await mongodb.getDb().db().collection('users').find({});
    results.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } );
}

const getSingle = async (req, res) => {
    const userId = req.params.id;
    const results = await mongodb.getDb().db().collection('users').find({ _id: new objectId(userId) });
    results.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } );
}

module.exports = {
    getAll,
    getSingle,
}