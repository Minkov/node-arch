const { ModelController } = require('../base/model.controller');

const { User } = require('../../models/user.model');

const { validator } = require('../../utils/validator');

const VALID_CHARS =
    'qwertyuiopasdfghjklzxcvbnm1234567890_.QWERTYUIOPASDFGHJKLZXCVBBNM';

const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

class UsersController extends ModelController {
    constructor(db) {
        super(db);
    }

    static get ModelType() {
        return User;
    }

    async signUpForm(req, res) {
        let viewName = `${this.viewsDir}/sign-up`;

        return res.render(viewName);
    }

    async signUp(req, res) {
        return this.create(req, res);
    }

    async _isModelValid(model) {
        const options = {
            chars: VALID_CHARS,
            minLength: MIN_LENGTH,
            maxLength: MAX_LENGTH,
        };

        const result = validator.checkString(model.username, options);
        if (result.isValid === false) {
            return false;
        }

        return true;
    }
}

module.exports = { UsersController };
