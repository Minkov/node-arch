class BaseController {
    constructor() {
        this.additionalRoutes = [];
    }

    async listAll(req, res) {
        const items = await this._getAll();
        let model = { items };
        return this._sendListAllResponse(res, { model });
    }

    async details(req, res) {
        // let item = await this.data.getById(req.params.id);
        const model = await this._getDetails(req.params.id);
        this._sendDetailsResponse(res, { model });
    }

    async create(req, res) {
        try {
            let model = await this._create(req.body);
            return this._sendCreateResponse(res, { model });
        } catch (ex) {
            console.log(ex);
            return this._sendErrorResponse(res, { error: ex });
        }
    }

    async _create(item) {
        throw new Error('Not implemented');
    }

    async _getAll() {
        throw new Error('Not implemented');
    }

    async _getDetails(id) {
        throw new Error('Not implemented');
    }
}

module.exports = { BaseController };

