const http = require('http');
const InMemoryPersonsService = require('./services/InMemoryPersonsService')
const PersonsController = require('./controllers/personsController')
const {getRequestData} = require('./utils/getRequestData');

require('dotenv').config()

const PORT = process.env.PORT || process.env.BACKEND_PORT;

const store = new InMemoryPersonsService();
const personsController = new PersonsController(store,getRequestData);

const server  = http.createServer( async(req, res) => {
  await personsController.createPerson(req,res);
});





server.listen(PORT , () =>
  console.log(`Server started on port ${PORT}`));