const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const results = await mongodb.getDb().db().collection('contacts').find({});
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } );
}

const getSingle = async (req, res) => {
    const contactId = req.params.id;
    const results = await mongodb.getDb().db().collection('contacts').find({ _id: new objectId(contactId) });
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } );
}

module.exports = {
    getAll,
    getSingle,
}