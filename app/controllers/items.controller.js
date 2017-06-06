const BaseController = require('./base.controller').BaseController;

class ItemsController extends BaseController {
    constructor(data) {
        super(data, 'items');
    }
}

module.exports = { ItemsController };
