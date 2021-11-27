const http = require('http');
const InMemoryPersonsService = require('./services/InMemoryPersonsService')
const PersonsController = require('./controllers/personsController')
const {bodyParser} = require('./utils/bodyParser');
const {urlParser} = require('./utils/urlParser');
const { v4: isUuid } = require('uuid');
const BodyValidationService = require('./services/bodyValidationService');

require('dotenv').config()

const PORT = process.env.PORT || process.env.BACKEND_PORT;

const store = new InMemoryPersonsService();
const bodyValidator = new BodyValidationService();
console.dir(bodyValidator);
const personsController = new PersonsController(store,bodyParser,bodyValidator);


const server  = http.createServer( async(req, res) => {
  const urlParsed = urlParser(req);
  if (urlParsed.length === 2 && !isUuid(urlParsed[1])) { 
    res.end('person id is not uuid format');
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
  res.end('Bad request');
});





server.listen(PORT , () =>
  console.log(`Server started on port ${PORT}`));