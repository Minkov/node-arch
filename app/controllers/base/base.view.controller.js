const { BaseController } = require('./base.controller');

const METHOD_TYPES = {
    'all': 1,
    'create': 2,
    'details': 3,
    'form': 4,
    'error': 5,
};

class BaseViewController extends BaseController {
    constructor(viewsDir) {
        super();
        this.viewsDir = viewsDir;
        this.additionalRoutes = [];
    }

    async _render(res, type, model) {
        let viewName = '';

        switch (type) {
            case METHOD_TYPES.form:
                viewName = `${this.viewsDir}/form`;
                break;
            case METHOD_TYPES.all:
                viewName = `${this.viewsDir}/all`;
                break;
            case METHOD_TYPES.create:
                viewName = `${this.viewsDir}/details`;
                break;
            case METHOD_TYPES.error:
                viewName = `${this.viewsDir}/error`;
                break;
        }

        return res.render(viewName, model);
    }

    async getForm(req, res) {
        return this._render(res, METHOD_TYPES.form, model);
    }

    async _sendListAllResponse(res, model) {
        this._render(res, METHOD_TYPES.all, model);
    }

    async _sendDetailsResponse(res, model) {
        this._render(res, METHOD_TYPES.details, model);
    }

    async _sendCreateResponse(res, model) {
        return res.redirect('/');
    }

    async _sendErrorResponse(res, model) {
        this._render(res, METHOD_TYPES.error, model);
    }
}

module.exports = { BaseViewController, METHOD_TYPES };
