const { BaseViewController, METHOD_TYPES } = require('./base.view.controller');
const { ModelData } = require('../../data/model.data');
const { Model } = require('../../models/base/model');

const { compile } = require('pug');

class ModelController extends BaseViewController {
    constructor(db) {
        super();
        this.ModelType = this.constructor.ModelType;
        this.DataType = this.constructor.DataType;
        this.viewsDir = this.ModelType.name.toLowerCase() + 's';
        this.db = db;
        this.data = new this.DataType(this.db, this.ModelType);
    }

    static get ModelType() {
        return Model;
    }

    static get DataType() {
        return ModelData;
    }

    _getTemplateFor(ModelType, type) {
        return `
ul
    for item in model.items
        li
            =JSON.stringify(item)
`;
    }

    _compile(template, model) {
        return compile(template)(model);
    }

    _render(res, type, model) {
        const template = this._getTemplateFor(this.ModelType, type);
        const html = this._compile(template, model);
        console.log(html);
        return res.send(html);
    }

    async _getAll() {
        return this.data.getAll()
            .then((models) => models.map(
                (model) => this.ModelType.fromDocument(model)
            ));
    }

    async _getDetails(id) {
        const doc = await this.data.getById(id);
        return this.ModelType.fromDocument(doc);
    }

    async _create(reqModel) {
        const model = this.ModelType.fromViewModel(reqModel);

        if (this._isModelValid && !(await this._isModelValid(model))) {
            throw new Error('Invalid model');
        }

        await this.data.create(model.toDocument());
    }

    async _isModelValid(model) {
        return true;
    }
}


module.exports = { ModelController };

