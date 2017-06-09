const { Model } = require('./base/model');

class Item extends Model {
    constructor() {
        super(['text']);
    }
}

module.exports = { Item };
