const { Model } = require('./model');

const properties = ['name', 'size'];

class Cookie extends Model {
    constructor() {
        super(properties);
    }
}

module.exports = { Cookie };
