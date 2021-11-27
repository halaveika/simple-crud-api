const getRequestData =(req) => new Promise((resolve, reject) => {
      try {
          let body = "";
          req.on("data", (chunk) => {
              body += chunk;
          });
          req.on("end", () => {
              if(body) {
                bodyParsed = JSON.parse(body);
            }
              resolve(bodyParsed);
          });
      } catch (error) {
          reject(error);
      }
  });

module.exports = { getRequestData };