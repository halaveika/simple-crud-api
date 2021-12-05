const { v4: uuidv4 } = require('uuid');

module.exports = class InMemoryPersonsService {
   persons= [
    {
      id: '1c2339c5-ef72-433b-a2da-cdab05988353',
      name: 'JOHN',
      age: 36,
      hobbies: ['drinking','sleeping'],
    },
    {
      id: 'c6f1cbce-040a-4034-ac97-51227fb96f37',
      name: 'Ann',
      age: 22,
      hobbies: ['painting','singing'],
    },
    {
      id: '3cdb76c0-ef7f-4cd0-8ac1-798dc572600a',
      name: 'Olya',
      age: 44,
      hobbies: ['tennis','voleyball'],
    },
    {
      id: '1b106cde-29b1-4bad-8af0-46e793b37673',
      name: 'Peter',
      age: 18,
      hobbies: [],
    },
    {
      id: '2e6244a9-cb57-48ad-b781-794296df3214',
      name: 'Smith',
      age: 45,
      hobbies: ['dating'],
    },
  ];

  findPersonById(id) {
    return this.persons.find(person => person.id === id);
  }

  getAllPersons() {
    return this.persons;
  }


  deletePersonById(id) {
    const index = this.persons.findIndex(person => person.id === id);
    if (index === -1) {
      return false;
    }
    this.persons.splice(index, 1);
    return true;
  }

  updatePerson(person, id) {
    const index = this.persons.findIndex(person => person.id === id);
    let updatedPerson;
    if (index !== -1) {
      updatedPerson = { ...this.persons[index], ...person };
      this.persons.splice(index, 1, updatedPerson);
    }
    return updatedPerson;
  }

  createPerson(person) {
    if(!person.name || !person.age || !person.hobbies) {return undefined}
    const newPerson = { id: uuidv4(), ...person};
    this.persons.push(newPerson);
    return newPerson;
  }
}
