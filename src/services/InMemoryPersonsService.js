const { v4: uuidv4 } = require('uuid');

class InMemoryPersonsService {
   persons= [
    {
      id: uuidv4(),
      name: 'JOHN',
      age: 36,
      hobbies: ['drinking','sleeping'],
    },
    {
      id: uuidv4(),
      name: 'Ann',
      age: 22,
      hobbies: ['painting','singing'],
    },
    {
      id: uuidv4(),
      name: 'Olya',
      age: 44,
      hobbies: ['tennis','voleyball'],
    },
    {
      id: uuidv4(),
      name: 'Peter',
      age: 18,
      hobbies: [],
    },
    {
      id: uuidv4(),
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

  updatePerson(id, person) {
    const index = this.persons.findIndex(person => person.id === id);
    let updatedPerson;
    if (index !== -1) {
      updatedPerson = { ...this.persons[index], ...person };
      this.persons.splice(index, 1, updatedPerson);
    }
    return updatedPerson;
  }

  createPerson(person) {
    const newPerson = { id: uuidv4(), ...person};
    this.persons.push(newPerson);
    return newPerson;
  }
}

module.exports = {
  InMemoryPersonsService
}