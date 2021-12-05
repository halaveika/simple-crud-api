const {personSchema} = require('../schemas/personSchema');
const {objectValidator} = require('../utils/objectValidator')

module.exports = class BodyValidationService {
  constructor(){
    this.personSchema = personSchema;
    this.objectValidator = objectValidator;
  }

  _handleResult = (errors) => {
    if (errors.length > 0) {
      let errorMessage ='';
      for (const { message } of errors) {
        errorMessage += `[${message}]; `;
      }
      return errorMessage;
    } else {
      return '';
    }
  }

    validatePerson = (object) => {
    const errors = this.objectValidator(object,this.personSchema);
    return this._handleResult(errors);
  }


}