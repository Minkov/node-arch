const { BaseModel } = require('./base.model');

const properties = [{
    name: 'name',
    type: Number
}];

class Cookie extends BaseModel {
    constructor() {
        super(properties);
    }
};

module.exports = { Cookie };
