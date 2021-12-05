const http = require('http');
const uuid = require('uuid');
const InMemoryPersonsService = require('./services/InMemoryPersonsService')
const PersonsController = require('./controllers/personsController')
const {bodyParser} = require('./utils/bodyParser');
const {urlParser} = require('./utils/urlParser');
const BodyValidationService = require('./services/bodyValidationService');
const {WrongEndpointError,ValidationError} = require('./customErrors/customErrors');

const store = new InMemoryPersonsService();
const bodyValidator = new BodyValidationService();
const personsController = new PersonsController(store,bodyParser,bodyValidator);


const app  = http.createServer( async(req, res) => {
  try {
    const urlParsed = urlParser(req);
    if (urlParsed.length === 2 && !uuid.validate(urlParsed[1]) && req.method !== "POST" ) { 
      throw new ValidationError('person id is not uuid format');
    }
    if (urlParsed.length === 1 && req.method === "GET") {
      return await personsController.getAllPersons(req,res);
    }
    if (urlParsed.length === 1 && req.method === "POST") {
      return await personsController.createPerson(req,res);
    }
    if (urlParsed.length === 2 && req.method === "GET") {
      return await personsController.getPerson(req,res,urlParsed);
    }
  
    if (urlParsed.length === 2 && req.method === "PUT") {
      return await personsController.updatePerson(req,res,urlParsed);
    }
    if (urlParsed.length === 2 && req.method === "DELETE") {
      return await personsController.deletePerson(req,res,urlParsed);
    }
    throw new WrongEndpointError(`${req.url} is bad endpoint. Should be /person or /person/{personId}. For POST only /person`);
  } catch (error) {
      res.writeHead((error.isCustom) ? error.code : 500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: (error.isCustom) ? error.message : error.message}))
  }

});

module.exports = {app}