module.exports = class PersonsController {
  constructor(storeService, requestHandler) {
    this.storeService = storeService;
    this.requestHandler = requestHandler;
  }

  createPerson = async(req, res) => {
    const personReq = await this.requestHandler(req) ;
    const newPerson = await this.storeService.createPerson(personReq);
    res.end(JSON.stringify(newPerson));
  }

  updatePerson = async(req, res) => {
    const personReq = await this.requestHandler(req) ;
    const updatedPerson = await this.storeService.updatePerson(personReq);
    res.end(JSON.stringify(updatedPerson));
  }

  deletePerson = async(req, res) => {
    const {id} = await this.requestHandler(req) ;
    const isDeleted = await this.storeService.deletePersonById(id);
    res.end(JSON.stringify(isDeleted));
  }

  getPerson = async(req, res) => {
    const {id} = await this.requestHandler(req) ;
    const person = await this.storeService.findPersonById(id);
    res.end(JSON.stringify(person));
  }

  getAllPersons = async(req, res) => {
    const persons = await this.storeService.getAllPersons();
    res.end(JSON.stringify(persons));
  }

}
