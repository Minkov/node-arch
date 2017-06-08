const { MongoClient } = require('mongodb');

class MongoDb {
    async connect(connectionString) {
        this.db = await MongoClient.connect(connectionString);
        return this.db;
    }

    async disconnect() {
        return this.db.close();
    }
};

module.exports = { MongoDb };
