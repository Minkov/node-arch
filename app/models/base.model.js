let modelProperties = {};

class BaseModel {
    constructor(properties ) {
        this.realType = this.constructor;
        this.realTypeName = this.realType.name;
        modelProperties[this.realTypeName] = properties;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    static Constructor() {
        return BaseModel;
    }

    toDocument() {
        // let doc = { };
        // modelProperties.forEach((prop) => {
        //     doc[prop] = this[prop];
        // });

        // doc._id = this.id;
        // return doc;
    }

    static fromDocument(doc) {
        console.log(' --- fromDocument ---');
        console.log(this.constructor.name);
        let model = new this();

        // modelProperties
        //     .forEach((prop) => {
        //         model[prop] = doc[prop];
        //     });

        return model;
    }
}

module.exports = { BaseModel };
