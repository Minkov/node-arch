class GenericDbData {
    constructor(db, Class) {
        this.db = db;
        this.Class = Class;
        this.collectionName = this.Class.name.toLowerCase() + 's';
        this.collection = this.db.collection(this.collectionName);
    }

    async getAll() {
        let all = this.collection.find({}).toArray()
            .then((docs) => docs.map((doc) => this.Class.fromDocument(doc)));
        return all;
    }

    async getById(id) {
        return this.Class.fromDocument(this.collection.findOne({ _id: id }));
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
