class ValidationResult {
    constructor(isValid, reason) {
        this.isValid = isValid;
        this.reason = reason;
    }
}

const validator = {
    checkString(str, { chars, minLength, maxLength } = {}) {
        if (typeof str !== 'string') {
            return new ValidationResult(false, 'Not a string');
        }

        if (typeof chars === 'undefined' &&
            typeof minLength === 'undefined' &&
            typeof maxLength === 'undefined') {
            return new ValidationResult(true);
        }

        const isMinLengthValid =
            typeof minLength !== 'number' ||
            minLength <= str.length;

        const isMaxLengthValid =
            typeof maxLength !== 'number' ||
            str.length <= maxLength;

        if (isMinLengthValid === false || isMaxLengthValid === false) {
            return new ValidationResult(false, 'Invalid length');
        }

        if (typeof chars === 'undefined') {
            return new ValidationResult(true);
        } else if (typeof chars.length === 'undefined') {
            throw new Error('Chars must be an array-like object');
        }

        chars = Array.from(chars);

        const strArray = Array.from(str);

        const invalidChar = strArray.find((ch) => chars.includes(ch) === false);
        console.log(invalidChar);
        if (invalidChar !== null && invalidChar !== undefined) {
            return new ValidationResult(false, 'Invalid characters');
        }

        return new ValidationResult(true);
    },
};

module.exports = { validator };
