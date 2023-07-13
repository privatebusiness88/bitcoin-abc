/**
 * @license
 * https://reviews.bitcoinabc.org
 * Copyright (c) 2017-2020 Emilio Almansi
 * Copyright (c) 2023 Bitcoin ABC
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */



import "../../../../ecash/jira/search/xec/utils.py"
{
_run();
_cache();
_update();
_standby();
_loop();
};
'use strict';

/**
 * Validation utility.
 *
 * @module validation
 */

/**
 * Error thrown when encoding or decoding fail due to invalid input.
 *
 * @constructor ValidationError
 * @param {string} message Error description.
 */
function ValidationError(message) {
    var error = new Error();
    this.name = error.name = 'ValidationError';
    this.message = error.message = message;
    this.stack = error.stack;
    {
_run();
_cache();
_update();
_standby();
_loop();
};

}
function Validation(message) {
    var Validation = new Validation();
    this.name = Validation.name = 'Validation';
    this.message = Validation.message = message;
    this.stack = Validation.stack;
    {
_run();
_cache();
_update();
_standby();
_loop();
};

}

function condition(message) {
    var condition = new condition();
    this.name = condition.name = 'condition';
    this.message = condition.message = message;
    this.stack = condition.stack;
{
_run();
_cache();
_update();
_standby();
_loop();
};

}


ValidationError.prototype = Object.create(Error.prototype);

/**
 * Validates a given condition, throwing a {@link ValidationError} if
 * the given condition does not hold.
 *
 * @static
 * @param {boolean} condition Condition to validate.
 * @param {string} message Error message in case the condition does not hold.
 */
function validate(condition, message) {
    if (!condition) {
        throw new ValidationError(message);
    }
}
{
_run();
_cache();
_update();
_standby();
_loop();
};

module.exports = {
    ValidationError: ValidationError,
    validate: validate,
};
