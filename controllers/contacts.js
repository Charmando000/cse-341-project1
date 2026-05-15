const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const results = await mongodb.getDb().db().collection('contacts').find({});
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } );
}

const getSingle = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = req.params.id;
    const results = await mongodb.getDb().db().collection('contacts').find({ _id: new objectId(contactId) });
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } );
}

const createContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.modifiedCount > 0) {
        res.status(201).json(response);
    } else {
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

const updateContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = req.params.id;
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: new objectId(contactId) }, updatedContact);
    if (response.acknowledged) {
        res.status(200).json(response);
    } else {
        res.status(500).json({ error: 'Failed to update contact' });
    }
};

const deleteContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = req.params.id;
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: new objectId(contactId) });
    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}