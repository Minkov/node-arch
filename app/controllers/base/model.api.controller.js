const { BaseApiController } = require('./base.api.controller');
const { ModelData } = require('../../data/model.data');
const { Model } = require('../../models/base/model');

class ModelApiController extends BaseApiController {
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
                (model) => this.ModelType.fromDocument(model).toViewModel()
            ));
    }

    async _getDetails(id) {
        const doc = await this.data.getById(id);
        return this.ModelType.fromDocument(doc).toViewModel();
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


module.exports = { ModelApiController };

