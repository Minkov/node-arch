import { BaseController } from './base.controller';

class ItemsController extends BaseController {
    constructor() {
        super(new ItemsData(), 'items');
    }
}

module.exports = { ItemsController };

