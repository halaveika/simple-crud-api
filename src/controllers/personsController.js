const { v4: uuidv4 } = require('uuid');

module.exports = class PersonsController {
  constructor(storeService, bodyParser, bodyValidator) {
    this.storeService = storeService;
    this.bodyParser = bodyParser;
    this.bodyValidator = bodyValidator;
  }

  createPerson = async(req, res) => {
    try {
      const personReq = await this.bodyParser(req) ;
      const isValidationError = this.bodyValidator.validatePerson(personReq);
      if(isValidationError) {
        throw new Error(isValidationError);
      }
      const newPerson = await this.storeService.createPerson(personReq);
      res.end(JSON.stringify(newPerson));
    } catch (error) {
      res.end(JSON.stringify(error.message))
    }

  }

  updatePerson = async(req, res,urlParsed) => {
    try {
      const personReq = await this.bodyParser(req);
      const isValidationError = this.bodyValidator.validatePerson(personReq);
      if(isValidationError) {
        throw new Error(isValidationError);
      }
      const updatedPerson = await this.storeService.updatePerson(personReq,urlParsed[1]);
      res.end(JSON.stringify(updatedPerson));
    } catch (error) {
      res.end(JSON.stringify(error))
    }

  }

  deletePerson = async(req, res, urlParsed) => {
    try {
      const isDeleted = await this.storeService.deletePersonById(urlParsed[1]);
      res.end(JSON.stringify(isDeleted));
    } catch (error) {
      res.end(JSON.stringify(error.message))
    }

  }

  getPerson = async(req, res, urlParsed) => {
    try {
      const person = await this.storeService.findPersonById(urlParsed[1]);
      res.end(JSON.stringify(person));
    } catch (error) {
      res.end(JSON.stringify(error.message))
    }

  }

  getAllPersons = async(req, res) => {
    try {
      const persons = await this.storeService.getAllPersons();
      res.end(JSON.stringify(persons));
    } catch (error) {
      res.end(JSON.stringify(error.message))
    }

  }

}
