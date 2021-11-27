const { v4: isUuid } = require('uuid');
 
 const personSchema = {
  name: value => typeof value === 'string',
  age: value => typeof value === 'number',
  hobbies: value => value instanceof Array && (value.every(el => typeof el=== 'string') || value.lenght === 0),
};

module.exports={personSchema}