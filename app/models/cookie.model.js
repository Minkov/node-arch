const { Model } = require('./base/model');

const properties = ['name', 'size'];

class Cookie extends Model {
    constructor() {
        super(properties);
    }

    static get properties() {
        return properties;
    }
}

module.exports = { Cookie };
