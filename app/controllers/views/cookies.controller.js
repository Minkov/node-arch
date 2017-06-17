const { METHOD_TYPES } = require('../base/base.view.controller');
const { ModelController } = require('../base/model.controller');

const { Cookie } = require('../../models/cookie.model');

class CookiesController extends ModelController {
    constructor(db) {
        super(db);
    }
    
    _getTemplateFor(ModelType, type) {
        if (type === METHOD_TYPES.all) {
            return `
<h1>Cookies!</h1>
ul
    for item in model.items
        li
            =item.name
`;
        }
        
        return super._getTemplateFor(ModelType, type);
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
