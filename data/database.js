const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
let database;

const initDb = (callback) => {
    if (database) {
        console.warn('Trying to init DB again!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
         callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!database) {
        throw new Error('Db has not been initialized. Please called init first.');
    }
    return database;
};

module.exports = {
    initDb,
    getDb,
};