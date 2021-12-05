const {ValidationError} = require('../customErrors/customErrors');

const bodyParser =(req) => new Promise((resolve, reject) => {
      try {
          let body = "";
          req.on("data", (chunk) => {
              body += chunk;
          });
          req.on("end", () => {
            try {
              if(body) {
                bodyParsed = JSON.parse(body);
            }
              resolve(bodyParsed);
            } catch (err) {
              reject(new ValidationError(`Invalid JSON file: ${err.message}`));
            }
         
          });
      } catch (error) {
          reject(error);
      }
  });

module.exports = { bodyParser };