
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name
    this.isCustom = true;
    this.code = 400;
  }
}

class NoIdError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name
    this.isCustom = true;
    this.code = 404;
  }
}

class WrongEndpointError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name
    this.isCustom = true;
    this.code = 404;
  }
}

class PersonExecutError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name
    this.isCustom = true;
    this.code = 500;
  }
}

module.exports = {
  ValidationError,
  NoIdError,
  WrongEndpointError,
  PersonExecutError,
};
