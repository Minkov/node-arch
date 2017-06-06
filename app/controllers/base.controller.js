class BaseController {
    constructor(data, viewsDir) {
        this.data = data;
        this.viewsDir = viewsDir;
        this.additionalRoutes = [];
    }

    async listAll(req, res) {
        let items = await this.data.getAll();
        let viewName = `${this.viewsDir}/all`;
        let model = { items };

        return res.render(viewName, { model });
    }

    async details(req, res) {
        let item = await this.data.getById(req.params.id);
    }

    async getForm(req, res) {
        let viewName = `${this.viewsDir}/form`;
        return res.render(viewName);
    }

    async create(req, res) {
        let item = req.body;
        console.log(item);

        if (!this._isModelValid(item)) {
            return res.render('404', { error: 'Invalid model' });
        }

        try {
            res.redirect('/');
        } catch (ex) {
            return res.render('404', { error: ex });
        }
    }


    _isModelValid(model) {
        return true;
    }
}

module.exports = { BaseController };

