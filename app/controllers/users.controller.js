const { BaseController } = require('./base.controller');

const { validator } = require('../utils/validator');

const VALID_CHARS = 'qwertyuiopasdfghjklzxcvbnm1234567890_.QWERTYUIOPASDFGHJKLZXCVBBNM';
const MIN_LENGTH = 3;
const MAX_LENGTH = 20;

class UsersController extends BaseController {
    constructor(data) {
        super(data, 'users');
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

        // let users = await this.data.search({
        //     username: model.username.toLowerCase(),
        // });

        // return users.length === 0;
    }
}

module.exports = { UsersController };
