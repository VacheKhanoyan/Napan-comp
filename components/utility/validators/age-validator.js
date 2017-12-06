const BaseValidator = require('./base');
const Utility = require('./../service');
const AppConstants = require('./../../settings/constants');

class ageValidator extends BaseValidator
{
    constructor()
    {
        super();
    }
    validate (age)
    {
        if(!super.validator(age, BaseValidator.Types.NUMBER))
        {
            return Utility.ErrorTypes.INVALID_AGE_RANGE;
        }
        if(parseInt(age) > parseInt(AppConstants.AGE_MAX_LENGTH) || parseInt(age) < parseInt(AppConstants.AGE_MIN_LENGTH))
        {
            return Utility.ErrorTypes.INVALID_AGE_RANGE;
        }
        return Utility.ErrorTypes.SUCCESS;
    }
}

module.exports = new ageValidator();
