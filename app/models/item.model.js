const { Model } = require('./base/model');

const properties = ['text'];

class Item extends Model {
    constructor() {
        super(properties);
    }

    static get properties() {
        return properties;
    }
}

module.exports = { Item };
