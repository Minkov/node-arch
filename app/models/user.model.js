const { Model } = require('./base/model');

const hash = (str) => {
    return '!*!*!*!*!' + str + '!';
};
const properties = ['username', 'password', 'email'];
class User extends Model {
    constructor() {
        super(properties);
    }

    static get properties() {
        return properties;
    }

    static fromViewModel(viewModel) {
        const model = new this();

        this.properties.forEach((prop) => {
            model[prop] = viewModel[prop];
        });

        model.password = hash(model.password);
        model.id = viewModel.id;
        return model;
    }

}

module.exports = { User };
