const { BaseModel } = require('./base.model');

const properties = ['name', 'size'];

class Item extends BaseModel {
    constructor() {
        super(properties);
    }
};

module.exports = { Item };
