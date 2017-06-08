const { BaseController } = require('./base.controller');

const cookies = [{
    name: 'Geri',
}, {
    name: 'Hrisi',
}];

const data = {
    async getAll() {
        return cookies;
    },

    async create(cookie) {
        cookies.push(cookie);
        return cookie;
    },
};

class CookiesController extends BaseController {
    constructor() {
        super(data, 'cookies');
    }

    async listAll(req, res) {
        let model = { items: cookies };
        const viewName = `${this.viewsDir}/all-cookies`;
        res.render(viewName, { model });
    }
}

module.exports = { CookiesController };
