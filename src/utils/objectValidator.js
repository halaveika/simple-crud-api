const {ValidationError} = require('../customErrors/customErrors');

const objectValidator = (object, schema) => Object
  .keys(schema)
  .filter(key => !schema[key](object[key]))
  .map(key => new ValidationError(`${key} is invalid.`));

  module.exports = { objectValidator };