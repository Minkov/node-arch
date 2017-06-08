const { Model } = require('./model');

class Item extends Model {
    constructor() {
        super(['text']);
    }
}

module.exports = { Item };
