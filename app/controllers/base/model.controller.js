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

    _getTemplateForAll() {
        let modelHtml = `
ul.${this.ModelType.name.toLowerCase()}s
    for item in model.items
        li`;
        this.ModelType.properties.forEach((property) => {
            const className =
                `${this.ModelType.name.toLowerCase()}-${property}`;
            modelHtml += `
            p.${className}
                | ${property}: 
                =item["${property}"]
`;
        });
        return modelHtml;
    }

    _getTemplateForForm() {
        const modelName = this.ModelType.name.toLowerCase();
        let modelHtml = `
form(method="POST", action="/${modelName}s")
`;

        this.ModelType.properties.forEach((property) => {
            modelHtml += `
    label
        input(name="${property}" placeholder="Enter ${property}")
`;
        });
        modelHtml += `
    button.btn.btn-success
        | Create
`;
        return modelHtml;
    }

    _getTemplateFor(type) {
        if (type === METHOD_TYPES.all) {
            return this._getTemplateForAll();
        } else if (type === METHOD_TYPES.form) {
            return this._getTemplateForForm();
        }
        return '';
    }

    _compile(template, model) {
        return compile(template)(model);
    }

    _render(res, type, model) {
        const template = this._getTemplateFor(type);
        console.log(model);
        const html = this._compile(template, model);
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

