const { ModelApiController } = require('../base/model.api.controller');

const { Cookie } = require('../../models/cookie.model');

class CookiesApiController extends ModelApiController {
    constructor(db) {
        super(db);
    }

    static get ModelType() {
        return Cookie;
    }

    _isModelValid(model) {
        console.log(model);
        return (typeof model !== 'undefined') &&
            (typeof model.size !== 'undefined' &&
                !isNaN(+model.size)) &&
            (typeof model.name === 'string' &&
             model.name.length >= 4);
    }
}

module.exports = { CookiesApiController };
