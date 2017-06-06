const BaseController = require('./base.controller').BaseController;
const ItemsData = require('../data/items.data').ItemsData;

class ItemsController extends BaseController {
    constructor() {
        super(new ItemsData(), 'items');
    }
}

module.exports = { ItemsController };
