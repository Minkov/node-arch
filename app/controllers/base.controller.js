class BaseController {
    constructor(viewsDir) {
        this.viewsDir = viewsDir;
        this.additionalRoutes = [];
    }

    async listAll(req, res) {
        const items = await this._getAll();

        let viewName = `${this.viewsDir}/all`;
        let model = { items };

        return res.render(viewName, { model });
    }

    async details(req, res) {
        // let item = await this.data.getById(req.params.id);
        const item = await this._getDetails(req.params.id);
        const viewName = `${this.viewsDir}/details`;
        const model = { item };
        return res.render(viewName, { model });
    }

    async getForm(req, res) {
        let viewName = `${this.viewsDir}/form`;
        return res.render(viewName);
    }

    async create(req, res) {
        console.log(' --- BaseController --- ');
        try {
            await this._create(req.body);
            res.redirect('/');
        } catch (ex) {
            console.log(ex);
            return res.render('404', { error: ex });
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

