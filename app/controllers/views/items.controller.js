const { ModelController } = require('../base/model.controller');

const { Item } = require('../../models/item.model');

class ItemsController extends ModelController {
    constructor(db) {
        super(db);
    }

    static get ModelType() {
        return Item;
    }
}

module.exports = { ItemsController };
