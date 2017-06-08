const { BaseController } = require('./base.controller');
const { ModelData } = require('../data/model.data');
const { Model } = require('../models/model');

class ModelController extends BaseController {
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

    async _getAll() {
        return this.data.getAll()
            .then((models) => models.map(
                (model) => this.ModelType.fromDocument(model)
            ));
    }

    async _getDetails(id) {
        return this.ModelType.fromDocument(this.data.getById(id));
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

