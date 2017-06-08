class Model {
    constructor(properties = []) {
        this.properties = properties;
        this.constructor.properties = properties;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    toDocument() {
        const doc = { };
        this.properties.forEach((prop) => {
            doc[prop] = this[prop];
        });

        doc._id = this.id;

        return doc;
    }

    static fromDocument(doc) {
        const model = new this();
        this.properties.forEach((prop) => {
            model[prop] = doc[prop];
        });

        model.id = doc._id;
        return model;
    }

    static fromViewModel(viewModel) {
        const model = new this();
        this.properties.forEach((prop) => {
            model[prop] = viewModel[prop];
        });

        model.id = viewModel.id;
        return model;
    }
}

module.exports = { Model };
