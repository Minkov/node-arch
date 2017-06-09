const { BaseController } = require('./base.controller');

class BaseApiController extends BaseController {
    constructor() {
        super();
        this.additionalRoutes = [];
    }

    async _sendListAllResponse(res, model) {
        return res.send(model);
    }

    async _sendDetailsResponse(res, model) {
        return res.send(model);
    }

    async _sendCreateResponse(res, model) {
        return res.send(model);
    }

    async _sendErrorResponse(res, model) {
        return res.send(model);
    }
}

module.exports = { BaseApiController };

