class GenericDbData {
    constructor(db, collectionName) {
        this.db = db;
        this.collectionName = collectionName.toLowerCase();
        this.collection = this.db.collection(this.collectionName);
    }

    async getAll() {
        return this.collection.find({}).toArray();
    }

    async getById(id) {
        return this.collection.findOne({ _id: id });
    }

    async search(props = {}) {
        return this.getAll();
    }

    async create(model) {
        let dbResult = await this.collection.insert(model);
        let id = dbResult.insertedIds[0];
        return this.getById(id);
    }
}

module.exports = { GenericDbData };
