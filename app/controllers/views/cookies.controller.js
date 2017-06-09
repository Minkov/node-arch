const { ModelController } = require('../base/model.controller');

const { Cookie } = require('../../models/cookie.model');

class CookiesController extends ModelController {
    constructor(db) {
        super(db);
    }

    static get ModelType() {
        return Cookie;
    }

    _isModelValid(model) {
        return (typeof model !== 'undefined') &&
            (typeof model.size !== 'undefined' &&
                !isNaN(+model.size)) &&
            (typeof model.name === 'string' &&
             model.name.length >= 4);
    }
}

module.exports = { CookiesController };
