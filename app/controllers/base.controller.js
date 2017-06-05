class BaseController {
    constructor(data, viewsDir) {
        this.data = data;
        this.viewsDir = viewsDir;
    }

    async listAll(req, res) {
        let items = await this.data.getAll();

        let viewName = `${this.viewsDir}/all`;

        let model = { items };

        return res.render(viewName, { model });
    }

    async create(req, res) {
        let item = req.body;
        if (!this._isModelValid(item)) {
            return res.render('404', { error: 'Invalid model' });
        }

        try {
            const model = await this.data.create({ ...item });
            const viewName = `${this.viewsDir}/details`;
            res.render(viewName, { model });
        } catch (ex) {
            return res.render('404', { error: ex });
        }
    }

    _isModelValid(model) {
        return true;
    }
}

export { BaseController };
