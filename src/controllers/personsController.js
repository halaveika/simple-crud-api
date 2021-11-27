const {PersonExecutError,NoIdError,ValidationError} = require('../customErrors/customErrors');

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
        throw new ValidationError(isValidationError);
      }
      const newPerson = await this.storeService.createPerson(personReq);
      if(!newPerson) {
        throw new PersonExecutError('New person have not add');
      }
      this._successResponse(201,newPerson,res)
    } catch (error) {
      this._errorResponse(error,res);
    }

  }

  updatePerson = async(req, res,urlParsed) => {
    try {
      const personReq = await this.bodyParser(req);
      const isValidationError = this.bodyValidator.validatePerson(personReq);
      if(isValidationError) {
        throw new ValidationError(isValidationError);
      }
      const updatedPerson = await this.storeService.updatePerson(personReq,urlParsed[1]);
      if(!updatedPerson) {
        throw new NoIdError('No person with such id in store');
      }
      this._successResponse(200,updatedPerson,res)
    } catch (error) {
      this._errorResponse(error,res);
    }

  }

  deletePerson = async(req, res, urlParsed) => {
    try {
      const isDeleted = await this.storeService.deletePersonById(urlParsed[1]);
      if(!isDeleted) {
        throw new NoIdError('No person with such id in store');
      }
      this._successResponse(204,{message:'Person was deleted success'},res)
    } catch (error) {
      this._errorResponse(error,res);
    }

  }

  getPerson = async(req, res, urlParsed) => {
    try {
      const person = await this.storeService.findPersonById(urlParsed[1]);
      if(!person) {
        throw new NoIdError('No person with such id in store');
      }
      this._successResponse(200,person,res)
    } catch (error) {
      this._errorResponse(error,res);
    }

  }

  getAllPersons = async(req, res) => {
    try {
      const persons = await this.storeService.getAllPersons();
      this._successResponse(200,persons,res)
    } catch (error) {
      this._errorResponse(error,res);
    }

  }

  _errorResponse = (error,res) =>{
    res.writeHead((error.isCustom) ? error.code : 500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: (error.isCustom) 
      ? error.message :
       "Error during execution on person route\n" + error.message}))
  }

  _successResponse = (statuscode,data,res) =>{
    res.writeHead(statuscode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data))
  }

}
