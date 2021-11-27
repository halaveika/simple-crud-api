const http = require('http');
const InMemoryPersonsService = require('./services/InMemoryPersonsService')

require('dotenv').config()

const PORT = process.env.PORT || process.env.BACKEND_PORT;

const server  = http.createServer( async(req, res) => {
    res.end('server work')
});






server.listen(PORT , () =>
  console.log(`Server started on port ${PORT}`));